"use client";

import { useEffect, useState, useMemo } from "react";
import { X, Loader2, FileText, Activity, Image as ImageIcon, MessageSquare, History } from "lucide-react";
import { toast } from "react-toastify";
import { ServiceBooking, serviceBookingService } from "@/services/serviceBooking.service";
import { technicianService, Technician } from "@/services/technician.service";
import Header from "./Header";
import Image from "next/image";

interface ServiceRequestModalViewProps {
  isOpen: boolean;
  bookingId: string | null;
  onClose: () => void;
}

type TabType = "overview" | "timeline";

interface TimelineEvent {
  id: string;
  type: "note" | "status_change";
  timestamp: string;
  author: string;
  content: React.ReactNode;
}

export default function ServiceRequestModalView({ isOpen, bookingId, onClose }: ServiceRequestModalViewProps) {
  const [booking, setBooking] = useState<ServiceBooking | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  // Overview quick actions state
  const [statusInput, setStatusInput] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [techInput, setTechInput] = useState("");
  const [assigningTech, setAssigningTech] = useState(false);

  // Notes state
  const [noteInput, setNoteInput] = useState("");
  const [addingNote, setAddingNote] = useState(false);

  useEffect(() => {
    if (!isOpen || !bookingId) return;
    loadBooking();
    loadTechnicians();
  }, [isOpen, bookingId]);

  useEffect(() => {
    if (!isOpen) {
      setBooking(null);
      setActiveTab("overview");
      setError(null);
    }
  }, [isOpen]);

  const loadBooking = async () => {
    if (!bookingId) return;
    try {
      setLoading(true);
      setError(null);
      const data = await serviceBookingService.getBooking(bookingId);
      setBooking(data);
      setStatusInput(data.status);
    } catch (error) {
      console.error("Failed to load booking:", error);
      setError("Unable to load booking information.");
    } finally {
      setLoading(false);
    }
  };

  const loadTechnicians = async () => {
    try {
      const res = await technicianService.getTechnicians("", 1); // Maybe fetch more or handle differently, but 1 page is fine for now
      if ("results" in res) {
        setTechnicians(res.results);
      } else {
        setTechnicians(res);
      }
    } catch (err) {
      console.error("Failed to load technicians", err);
    }
  };

  // Merge notes and status history into chronological timeline
  const timelineEvents = useMemo(() => {
    if (!booking) return [];
    
    const events: TimelineEvent[] = [];
    
    if (booking.notes) {
      booking.notes.forEach(note => {
        events.push({
          id: note.id,
          type: "note",
          timestamp: note.created_at,
          author: note.author_email,
          content: note.note,
        });
      });
    }

    if (booking.status_history) {
      booking.status_history.forEach(hist => {
        events.push({
          id: hist.id,
          type: "status_change",
          timestamp: hist.created_at,
          author: hist.changed_by_email,
          content: (
            <span>
              Changed status from <span className="font-semibold">{hist.old_status || "None"}</span> to <span className="font-semibold">{hist.new_status}</span>
            </span>
          ),
        });
      });
    }

    // Sort descending (newest first)
    return events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [booking]);

  const handleUpdateStatus = async () => {
    if (!booking || !statusInput || statusInput === booking.status) return;
    try {
      setUpdatingStatus(true);
      await serviceBookingService.updateStatus(booking.id, statusInput);
      toast.success("Status updated successfully");
      loadBooking(); // refresh
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleAssignTechnician = async () => {
    if (!booking || !techInput) return;
    try {
      setAssigningTech(true);
      await serviceBookingService.assignTechnician(booking.id, techInput);
      toast.success("Technician assigned successfully");
      loadBooking(); // refresh
    } catch (err) {
      console.error(err);
      toast.error("Failed to assign technician");
    } finally {
      setAssigningTech(false);
    }
  };

  const handleAddNote = async () => {
    if (!booking || !noteInput.trim()) return;
    try {
      setAddingNote(true);
      
      // Optimistic update
      const fakeNote = {
        id: "temp-" + Date.now(),
        author_email: "You",
        note: noteInput,
        created_at: new Date().toISOString()
      };
      setBooking(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          notes: [fakeNote, ...(prev.notes || [])]
        };
      });
      const noteToSend = noteInput;
      setNoteInput("");

      await serviceBookingService.addNote(booking.id, noteToSend);
      toast.success("Note added");
      loadBooking(); // actual background refetch
    } catch (err) {
      console.error(err);
      toast.error("Failed to add note");
      loadBooking(); // rollback optimistic update on error
    } finally {
      setAddingNote(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-30 rounded-full bg-black/10 p-2 text-white transition hover:bg-black/20"
        >
          <X size={20} />
        </button>

        {loading && !booking && (
          <div className="flex min-h-[500px] items-center justify-center">
            <Loader2 size={34} className="animate-spin text-blue-600" />
          </div>
        )}

        {!loading && error && (
          <div className="flex min-h-[500px] flex-col items-center justify-center px-6">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {booking && (
          <>
            <Header booking={booking} />

            <div className="border-b border-slate-200 px-6 sm:px-8">
              <div className="flex gap-6">
                <button
                  type="button"
                  onClick={() => setActiveTab("overview")}
                  className={`relative flex items-center gap-2 py-4 text-sm font-medium transition ${
                    activeTab === "overview" ? "text-blue-600" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <FileText size={16} /> Overview
                  {activeTab === "overview" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("timeline")}
                  className={`relative flex items-center gap-2 py-4 text-sm font-medium transition ${
                    activeTab === "timeline" ? "text-blue-600" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Activity size={16} /> Timeline & Notes
                  {activeTab === "timeline" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 p-6 sm:p-8">
              {activeTab === "overview" && (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-2 space-y-6">
                    {/* Customer Info */}
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                      <h3 className="mb-4 font-semibold text-slate-800">Customer Information</h3>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-xs font-medium text-slate-500">Name</p>
                          <p className="mt-1 text-sm font-medium text-slate-900">{booking.customer_name}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-500">Phone</p>
                          <p className="mt-1 text-sm text-slate-900">{booking.phone}</p>
                        </div>
                        <div className="sm:col-span-2">
                          <p className="text-xs font-medium text-slate-500">Email</p>
                          <p className="mt-1 text-sm text-slate-900">{booking.email || "—"}</p>
                        </div>
                      </div>
                    </div>

                    {/* Service Info */}
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                      <h3 className="mb-4 font-semibold text-slate-800">Service Details</h3>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-xs font-medium text-slate-500">Service Type</p>
                          <p className="mt-1 text-sm text-slate-900">{booking.service_type}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-500">Product</p>
                          <p className="mt-1 text-sm text-slate-900">{booking.product_name || booking.product_model_text}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-500">Preferred Date & Time</p>
                          <p className="mt-1 text-sm text-slate-900">{booking.preferred_date} • {booking.preferred_time}</p>
                        </div>
                        <div className="sm:col-span-2">
                          <p className="text-xs font-medium text-slate-500">Description</p>
                          <p className="mt-1 text-sm text-slate-900">{booking.description || "No description provided."}</p>
                        </div>
                      </div>
                    </div>

                    {/* Address Info */}
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                      <h3 className="mb-4 font-semibold text-slate-800">Address</h3>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-xs font-medium text-slate-500">Division</p>
                          <p className="mt-1 text-sm text-slate-900">{booking.division}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-500">District</p>
                          <p className="mt-1 text-sm text-slate-900">{booking.district}</p>
                        </div>
                        <div className="sm:col-span-2">
                          <p className="text-xs font-medium text-slate-500">Full Address</p>
                          <p className="mt-1 text-sm text-slate-900">{booking.full_address}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                      <h3 className="mb-4 font-semibold text-slate-800">Quick Actions</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="mb-1 block text-xs font-medium text-slate-500">Update Status</label>
                          <div className="flex gap-2">
                            <select
                              value={statusInput}
                              onChange={(e) => setStatusInput(e.target.value)}
                              className="block w-full rounded-lg border-slate-300 bg-white py-2 pl-3 pr-8 text-sm focus:border-blue-500 focus:ring-blue-500 border"
                            >
                              <option value="PENDING">Pending</option>
                              <option value="CONTACTED">Contacted</option>
                              <option value="SCHEDULED">Scheduled</option>
                              <option value="IN_PROGRESS">In Progress</option>
                              <option value="COMPLETED">Completed</option>
                              <option value="CANCELLED">Cancelled</option>
                            </select>
                            <button
                              type="button"
                              onClick={handleUpdateStatus}
                              disabled={updatingStatus || statusInput === booking.status}
                              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                              {updatingStatus ? <Loader2 size={16} className="animate-spin" /> : "Save"}
                            </button>
                          </div>
                        </div>

                        <div className="pt-2">
                          <label className="mb-1 block text-xs font-medium text-slate-500">Assign Technician</label>
                          <div className="flex gap-2">
                            <select
                              value={techInput}
                              onChange={(e) => setTechInput(e.target.value)}
                              className="block w-full rounded-lg border-slate-300 bg-white py-2 pl-3 pr-8 text-sm focus:border-blue-500 focus:ring-blue-500 border"
                            >
                              <option value="">Select Tech...</option>
                              {technicians.map(tech => (
                                <option key={tech.id} value={tech.id}>{tech.full_name}</option>
                              ))}
                            </select>
                            <button
                              type="button"
                              onClick={handleAssignTechnician}
                              disabled={assigningTech || !techInput}
                              className="inline-flex items-center justify-center rounded-lg bg-slate-800 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-900 disabled:opacity-50"
                            >
                              {assigningTech ? <Loader2 size={16} className="animate-spin" /> : "Assign"}
                            </button>
                          </div>
                          {booking.technician_email && (
                            <p className="mt-2 text-xs text-slate-500">
                              Currently assigned: <span className="font-medium text-slate-700">{booking.technician_email}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Attachment */}
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                      <h3 className="mb-4 flex items-center gap-2 font-semibold text-slate-800">
                        <ImageIcon size={18} className="text-slate-400" />
                        Uploaded Image
                      </h3>
                      
                      {booking.attachment ? (
                        <a href={booking.attachment} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-lg border border-slate-200 transition hover:opacity-90">
                          <div className="relative aspect-video w-full bg-slate-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={booking.attachment}
                              alt="Service Request Attachment"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="bg-slate-50 p-2 text-center text-xs font-medium text-slate-600">
                            Click to view full size
                          </div>
                        </a>
                      ) : (
                        <div className="flex h-32 flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400">
                          <ImageIcon size={24} className="mb-2 opacity-50" />
                          <span className="text-sm">No attachment</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "timeline" && (
                <div className="mx-auto max-w-3xl space-y-6">
                  {/* Add Note */}
                  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <label htmlFor="note" className="mb-2 block text-sm font-semibold text-slate-800">
                      Add a Note
                    </label>
                    <textarea
                      id="note"
                      rows={3}
                      value={noteInput}
                      onChange={(e) => setNoteInput(e.target.value)}
                      placeholder="Type your internal note here..."
                      className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-3"
                    />
                    <div className="mt-3 flex justify-end">
                      <button
                        type="button"
                        onClick={handleAddNote}
                        disabled={addingNote || !noteInput.trim()}
                        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                      >
                        {addingNote ? <Loader2 size={16} className="animate-spin mr-2" /> : null}
                        Post Note
                      </button>
                    </div>
                  </div>

                  {/* Timeline Feed */}
                  <div className="flow-root">
                    {timelineEvents.length > 0 ? (
                      <ul role="list" className="-mb-8">
                        {timelineEvents.map((event, eventIdx) => (
                          <li key={event.id}>
                            <div className="relative pb-8">
                              {eventIdx !== timelineEvents.length - 1 ? (
                                <span className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-slate-200" aria-hidden="true" />
                              ) : null}
                              <div className="relative flex items-start space-x-3">
                                <div className="relative">
                                  {event.type === "note" ? (
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 ring-8 ring-slate-50">
                                      <MessageSquare className="h-5 w-5 text-blue-600" />
                                    </div>
                                  ) : (
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 ring-8 ring-slate-50">
                                      <History className="h-5 w-5 text-amber-600" />
                                    </div>
                                  )}
                                </div>
                                <div className="min-w-0 flex-1 pt-1.5">
                                  <div className="text-sm text-slate-500">
                                    <span className="font-medium text-slate-900">{event.author || "System"}</span>
                                    {' '}
                                    {event.type === "note" ? "left a note" : "updated status"}
                                    <span className="whitespace-nowrap ml-2 text-xs text-slate-400">
                                      {new Date(event.timestamp).toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="mt-2 text-sm text-slate-700">
                                    {event.type === "note" ? (
                                      <div className="rounded-lg bg-slate-100 p-3 italic">"{event.content}"</div>
                                    ) : (
                                      <div>{event.content}</div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="py-12 text-center text-sm text-slate-500">
                        No history or notes found for this request.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
