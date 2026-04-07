import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  Users, Bell, MessageCircle, Plus, Trash2, Send, LogOut, Phone, Mail, Building2, X, CheckCircle, AlertCircle
} from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';

type Customer = Tables<'customers'>;
type Reminder = Tables<'reminders'>;
type MessageLog = Tables<'message_logs'>;

export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'customers' | 'reminders' | 'logs'>('customers');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Customers
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', email: '', company: '', notes: '' });

  // Reminders
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [newReminder, setNewReminder] = useState({ title: '', message_template: '', day_of_month: 1 });
  const [selectedReminder, setSelectedReminder] = useState<string | null>(null);
  const [reminderCustomerIds, setReminderCustomerIds] = useState<string[]>([]);
  const [showAssignCustomers, setShowAssignCustomers] = useState(false);

  // Logs
  const [logs, setLogs] = useState<MessageLog[]>([]);

  // Send now state
  const [sendingReminder, setSendingReminder] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }
      setUser(session.user);
      setLoading(false);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate('/auth');
      else setUser(session.user);
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    fetchCustomers();
    fetchReminders();
    fetchLogs();
  }, [user]);

  const fetchCustomers = async () => {
    const { data } = await supabase.from('customers').select('*').order('created_at', { ascending: false });
    if (data) setCustomers(data);
  };

  const fetchReminders = async () => {
    const { data } = await supabase.from('reminders').select('*').order('created_at', { ascending: false });
    if (data) setReminders(data);
  };

  const fetchLogs = async () => {
    const { data } = await supabase.from('message_logs').select('*').order('sent_at', { ascending: false }).limit(50);
    if (data) setLogs(data);
  };

  const addCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const { error } = await supabase.from('customers').insert({
      ...newCustomer,
      user_id: user.id,
    });
    if (error) { toast.error(error.message); return; }
    toast.success('Customer added');
    setNewCustomer({ name: '', phone: '', email: '', company: '', notes: '' });
    setShowAddCustomer(false);
    fetchCustomers();
  };

  const deleteCustomer = async (id: string) => {
    const { error } = await supabase.from('customers').delete().eq('id', id);
    if (error) { toast.error(error.message); return; }
    toast.success('Customer deleted');
    fetchCustomers();
  };

  const addReminder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const { error } = await supabase.from('reminders').insert({
      ...newReminder,
      user_id: user.id,
    });
    if (error) { toast.error(error.message); return; }
    toast.success('Reminder created');
    setNewReminder({ title: '', message_template: '', day_of_month: 1 });
    setShowAddReminder(false);
    fetchReminders();
  };

  const deleteReminder = async (id: string) => {
    const { error } = await supabase.from('reminders').delete().eq('id', id);
    if (error) { toast.error(error.message); return; }
    toast.success('Reminder deleted');
    fetchReminders();
  };

  const toggleReminderActive = async (id: string, currentActive: boolean) => {
    const { error } = await supabase.from('reminders').update({ is_active: !currentActive }).eq('id', id);
    if (error) { toast.error(error.message); return; }
    fetchReminders();
  };

  const openAssignCustomers = async (reminderId: string) => {
    setSelectedReminder(reminderId);
    const { data } = await supabase.from('reminder_customers').select('customer_id').eq('reminder_id', reminderId);
    setReminderCustomerIds(data?.map(rc => rc.customer_id) || []);
    setShowAssignCustomers(true);
  };

  const toggleCustomerAssignment = async (customerId: string) => {
    if (!selectedReminder) return;
    const isAssigned = reminderCustomerIds.includes(customerId);
    if (isAssigned) {
      await supabase.from('reminder_customers').delete().eq('reminder_id', selectedReminder).eq('customer_id', customerId);
      setReminderCustomerIds(prev => prev.filter(id => id !== customerId));
    } else {
      await supabase.from('reminder_customers').insert({ reminder_id: selectedReminder, customer_id: customerId });
      setReminderCustomerIds(prev => [...prev, customerId]);
    }
  };

  const sendReminderNow = async (reminderId: string) => {
    setSendingReminder(reminderId);
    try {
      const reminder = reminders.find(r => r.id === reminderId);
      if (!reminder) return;

      // Get assigned customers
      const { data: rcData } = await supabase.from('reminder_customers').select('customer_id').eq('reminder_id', reminderId);
      if (!rcData || rcData.length === 0) {
        toast.error('No customers assigned to this reminder');
        return;
      }

      const customerIds = rcData.map(rc => rc.customer_id);
      const assignedCustomers = customers.filter(c => customerIds.includes(c.id));

      // Send WhatsApp messages via WhatsApp API link (opens in new tab for each)
      for (const customer of assignedCustomers) {
        const message = reminder.message_template
          .replace('{{name}}', customer.name)
          .replace('{{company}}', customer.company || '');

        // Log the message
        await supabase.from('message_logs').insert({
          user_id: user.id,
          reminder_id: reminderId,
          customer_id: customer.id,
          phone: customer.phone,
          message: message,
          status: 'sent',
        });

        // Open WhatsApp link
        const phone = customer.phone.replace(/[^0-9]/g, '');
        const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank');
      }

      toast.success(`Opened WhatsApp for ${assignedCustomers.length} customer(s)`);
      fetchLogs();
    } catch (error: any) {
      toast.error('Failed to send: ' + error.message);
    } finally {
      setSendingReminder(null);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-body text-muted-foreground">Loading...</div>;

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <h1 className="font-heading text-lg sm:text-xl font-bold text-foreground">UniCore Admin</h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-xs text-muted-foreground hidden sm:block">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut size={16} />
              <span className="hidden sm:inline ml-1">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-1 sm:gap-2 mb-6 bg-secondary/50 rounded-lg p-1 overflow-x-auto">
          {[
            { key: 'customers' as const, label: 'Customers', icon: Users },
            { key: 'reminders' as const, label: 'Reminders', icon: Bell },
            { key: 'logs' as const, label: 'Message Logs', icon: MessageCircle },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.key ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground">Customers ({customers.length})</h2>
              <Button onClick={() => setShowAddCustomer(true)} size="sm">
                <Plus size={16} /> <span className="hidden sm:inline">Add Customer</span>
              </Button>
            </div>

            {showAddCustomer && (
              <div className="bg-card border border-border rounded-xl p-4 sm:p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-foreground">New Customer</h3>
                  <button onClick={() => setShowAddCustomer(false)}><X size={18} className="text-muted-foreground" /></button>
                </div>
                <form onSubmit={addCustomer} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input placeholder="Name *" required value={newCustomer.name} onChange={e => setNewCustomer(p => ({ ...p, name: e.target.value }))} />
                  <Input placeholder="Phone * (e.g. 919845346214)" required value={newCustomer.phone} onChange={e => setNewCustomer(p => ({ ...p, phone: e.target.value }))} />
                  <Input placeholder="Email" type="email" value={newCustomer.email} onChange={e => setNewCustomer(p => ({ ...p, email: e.target.value }))} />
                  <Input placeholder="Company" value={newCustomer.company} onChange={e => setNewCustomer(p => ({ ...p, company: e.target.value }))} />
                  <div className="sm:col-span-2">
                    <Input placeholder="Notes" value={newCustomer.notes} onChange={e => setNewCustomer(p => ({ ...p, notes: e.target.value }))} />
                  </div>
                  <div className="sm:col-span-2">
                    <Button type="submit" className="w-full sm:w-auto">Save Customer</Button>
                  </div>
                </form>
              </div>
            )}

            <div className="space-y-3">
              {customers.length === 0 && <p className="text-muted-foreground text-center py-12">No customers yet. Add your first customer above.</p>}
              {customers.map(c => (
                <div key={c.id} className="bg-card border border-border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-foreground truncate">{c.name}</div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Phone size={12} /> {c.phone}</span>
                      {c.email && <span className="flex items-center gap-1"><Mail size={12} /> {c.email}</span>}
                      {c.company && <span className="flex items-center gap-1"><Building2 size={12} /> {c.company}</span>}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deleteCustomer(c.id)} className="text-destructive shrink-0">
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reminders Tab */}
        {activeTab === 'reminders' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground">Reminders ({reminders.length})</h2>
              <Button onClick={() => setShowAddReminder(true)} size="sm">
                <Plus size={16} /> <span className="hidden sm:inline">New Reminder</span>
              </Button>
            </div>

            {showAddReminder && (
              <div className="bg-card border border-border rounded-xl p-4 sm:p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-foreground">New Reminder</h3>
                  <button onClick={() => setShowAddReminder(false)}><X size={18} className="text-muted-foreground" /></button>
                </div>
                <form onSubmit={addReminder} className="space-y-3">
                  <Input placeholder="Title (e.g. Monthly Invoice Reminder)" required value={newReminder.title} onChange={e => setNewReminder(p => ({ ...p, title: e.target.value }))} />
                  <textarea
                    placeholder="Message template. Use {{name}} and {{company}} as placeholders."
                    className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    rows={3}
                    required
                    value={newReminder.message_template}
                    onChange={e => setNewReminder(p => ({ ...p, message_template: e.target.value }))}
                  />
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-muted-foreground whitespace-nowrap">Day of month:</label>
                    <Input
                      type="number"
                      min={1}
                      max={28}
                      className="w-20"
                      value={newReminder.day_of_month}
                      onChange={e => setNewReminder(p => ({ ...p, day_of_month: parseInt(e.target.value) || 1 }))}
                    />
                  </div>
                  <Button type="submit">Create Reminder</Button>
                </form>
              </div>
            )}

            {/* Assign customers modal */}
            {showAssignCustomers && selectedReminder && (
              <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                <div className="bg-card border border-border rounded-xl p-6 max-w-md w-full max-h-[70vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-foreground">Assign Customers</h3>
                    <button onClick={() => setShowAssignCustomers(false)}><X size={18} className="text-muted-foreground" /></button>
                  </div>
                  {customers.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No customers to assign. Add customers first.</p>
                  ) : (
                    <div className="space-y-2">
                      {customers.map(c => (
                        <button
                          key={c.id}
                          onClick={() => toggleCustomerAssignment(c.id)}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors text-left ${
                            reminderCustomerIds.includes(c.id) ? 'border-accent bg-accent/10' : 'border-border hover:border-accent/30'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${
                            reminderCustomerIds.includes(c.id) ? 'border-accent bg-accent' : 'border-muted-foreground'
                          }`}>
                            {reminderCustomerIds.includes(c.id) && <CheckCircle size={12} className="text-accent-foreground" />}
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-foreground text-sm truncate">{c.name}</div>
                            <div className="text-xs text-muted-foreground">{c.phone}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                  <Button className="w-full mt-4" onClick={() => setShowAssignCustomers(false)}>Done</Button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {reminders.length === 0 && <p className="text-muted-foreground text-center py-12">No reminders yet. Create one to get started.</p>}
              {reminders.map(r => (
                <div key={r.id} className="bg-card border border-border rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${r.is_active ? 'bg-green-500' : 'bg-gray-400'}`} />
                        <span className="font-semibold text-foreground truncate">{r.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{r.message_template}</p>
                      <p className="text-xs text-muted-foreground mt-1">Sends on day {r.day_of_month} of each month</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button variant="outline" size="sm" onClick={() => openAssignCustomers(r.id)}>
                        <Users size={14} /> <span className="text-xs">Assign</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => sendReminderNow(r.id)}
                        disabled={sendingReminder === r.id}
                      >
                        <Send size={14} /> <span className="text-xs">Send Now</span>
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => toggleReminderActive(r.id, r.is_active)}>
                        {r.is_active ? 'Pause' : 'Activate'}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteReminder(r.id)} className="text-destructive">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Logs Tab */}
        {activeTab === 'logs' && (
          <div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-4">Message Logs</h2>
            <div className="space-y-2">
              {logs.length === 0 && <p className="text-muted-foreground text-center py-12">No messages sent yet.</p>}
              {logs.map(log => (
                <div key={log.id} className="bg-card border border-border rounded-lg p-4 flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-sm">
                      {log.status === 'sent' ? (
                        <CheckCircle size={14} className="text-green-500 shrink-0" />
                      ) : (
                        <AlertCircle size={14} className="text-destructive shrink-0" />
                      )}
                      <span className="font-medium text-foreground">{log.phone}</span>
                      <span className="text-muted-foreground text-xs">{new Date(log.sent_at).toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{log.message}</p>
                    {log.error_message && <p className="text-xs text-destructive mt-1">{log.error_message}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
