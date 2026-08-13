"use client";

import { useEffect, useState } from "react";
import { Search, Filter, CheckCircle, XCircle, Calendar, Edit } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { installationsService, InstallationRequest } from "@/services/installations";
import { technicianService, Technician } from "@/services/technicianService";

export default function AdminInstallations() {
  const [requests, setRequests] = useState<InstallationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  
  // Modals state
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedReq, setSelectedReq] = useState<InstallationRequest | null>(null);
  
  const [adminNotes, setAdminNotes] = useState("");
  const [assignForm, setAssignForm] = useState({ technician_id: "", scheduled_date: "", address: "" });

  useEffect(() => {
    fetchRequests();
    fetchTechnicians();
  }, []);

  const fetchRequests = async (search = "") => {
    setLoading(true);
    try {
      const params: Record<string, string> = {};
      if (search) params.search = search;
      
      const response = await installationsService.getRequests(params);
      // Depending on pagination structure in backend, adjust response.results vs response
      const data = (response as any).results ? (response as any).results : response;
      setRequests(data || []);
    } catch (error) {
      console.error("Failed to fetch installation requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTechnicians = async () => {
    try {
      const response = await technicianService.getTechnicians();
      setTechnicians(response.results || []);
    } catch (error) {
      console.error("Failed to fetch technicians:", error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRequests(searchQuery);
  };

  const handleApprove = async () => {
    if (!selectedReq) return;
    try {
      await installationsService.approveRequest(selectedReq.id, { admin_notes: adminNotes });
      setIsApproveModalOpen(false);
      setAdminNotes("");
      fetchRequests();
    } catch (error) {
      alert("Failed to approve");
    }
  };

  const handleDisapprove = async () => {
    if (!selectedReq) return;
    try {
      await installationsService.disapproveRequest(selectedReq.id, { admin_notes: adminNotes });
      setIsApproveModalOpen(false);
      setAdminNotes("");
      fetchRequests();
    } catch (error) {
      alert("Failed to disapprove");
    }
  };

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReq) return;
    try {
      await installationsService.assignTechnician(selectedReq.id, assignForm);
      setIsAssignModalOpen(false);
      setAssignForm({ technician_id: "", scheduled_date: "", address: "" });
      fetchRequests();
    } catch (error) {
      alert("Failed to assign technician");
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'PENDING_APPROVAL': return <Badge variant="default">Pending</Badge>;
      case 'APPROVED': return <Badge variant="success">Approved</Badge>;
      case 'DISAPPROVED': return <Badge variant="danger">Disapproved</Badge>;
      case 'ASSIGNED': return <Badge variant="default" className="bg-blue-500 text-white">Assigned</Badge>;
      case 'IN_PROGRESS': return <Badge variant="default" className="bg-yellow-500 text-white">In Progress</Badge>;
      case 'COMPLETED': return <Badge variant="success">Completed</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Installation Requests
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage, approve, and assign installation requests from dealers.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">All Requests</CardTitle>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {requests.length} total
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <form onSubmit={handleSearch} className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by customer email, serial number..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <Button variant="outline" className="shrink-0">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer / Product</TableHead>
                <TableHead>Dealer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                    Loading requests...
                  </TableCell>
                </TableRow>
              ) : requests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                    No requests found.
                  </TableCell>
                </TableRow>
              ) : (
                requests.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {req.customer_name || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Product ID: #{req.registered_product}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-900 dark:text-gray-300">
                        {req.dealer_name || 'N/A'}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(req.status)}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(req.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right flex justify-end gap-2">
                      {req.status === 'PENDING_APPROVAL' && (
                        <Button variant="outline" size="sm" onClick={() => { setSelectedReq(req); setIsApproveModalOpen(true); }}>
                          Review
                        </Button>
                      )}
                      {(req.status === 'APPROVED' || req.status === 'SCHEDULED') && (
                        <Button variant="primary" size="sm" onClick={() => { setSelectedReq(req); setIsAssignModalOpen(true); }}>
                          Assign
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Approve / Disapprove Modal */}
      {isApproveModalOpen && selectedReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 w-full max-w-md overflow-hidden p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Review Request #{selectedReq.id}</h2>
            <p className="text-sm text-gray-500">Customer: {selectedReq.customer_name}</p>
            <div>
              <label className="block text-sm font-medium mb-1">Admin Notes (Optional)</label>
              <textarea 
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
                rows={3} 
                value={adminNotes} 
                onChange={(e) => setAdminNotes(e.target.value)}
              />
            </div>
            <div className="pt-4 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsApproveModalOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={handleDisapprove}>Disapprove</Button>
              <Button variant="success" onClick={handleApprove}>Approve</Button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Technician Modal */}
      {isAssignModalOpen && selectedReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 w-full max-w-md overflow-hidden p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Assign Technician (Req #{selectedReq.id})</h2>
            <form onSubmit={handleAssign} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Technician</label>
                <select 
                  required
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
                  value={assignForm.technician_id}
                  onChange={(e) => setAssignForm({...assignForm, technician_id: e.target.value})}
                >
                  <option value="">Select a technician</option>
                  {technicians.map(t => (
                    <option key={t.id} value={t.id}>{t.full_name} ({t.email})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Scheduled Date</label>
                <Input required type="datetime-local" value={assignForm.scheduled_date} onChange={(e) => setAssignForm({...assignForm, scheduled_date: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <textarea required className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm" rows={3} value={assignForm.address} onChange={(e) => setAssignForm({...assignForm, address: e.target.value})} />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsAssignModalOpen(false)}>Cancel</Button>
                <Button type="submit" variant="primary">Assign</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
