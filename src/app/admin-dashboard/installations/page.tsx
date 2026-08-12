/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import InstallationHeader from "./components/InstallationHeader";

import InstallationStats, {
  InstallationFilter,
} from "./components/InstallationStats";

import InstallationSearch from "./components/InstallationSearch";

import InstallationList from "./components/InstallationList";

import InstallationPagination from "./components/InstallationPagination";

import InstallationReviewModal from "./components/InstallationReviewModal";

import InstallationAssignModal from "./components/InstallationAssignModal";

import InstallationDetailsModal from "./components/InstallationDetailsModal";

import DeleteInstallationModal from "./components/DeleteInstallationModal";

import {
  installationsService,
  InstallationRequest,
  InstallationStatistics,
} from "@/services/installations";

import {
  technicianService,
  Technician,
} from "@/services/technician.service";

export default function AdminInstallations() {
  /* ============================================================
     STATE
  ============================================================ */

  const [requests, setRequests] =
    useState<InstallationRequest[]>([]);

  const [technicians, setTechnicians] =
    useState<Technician[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [technicianLoading, setTechnicianLoading] =
    useState(false);

  /* ============================================================
     INSTALLATION STATISTICS
  ============================================================ */

  const [statistics, setStatistics] =
    useState<InstallationStatistics>({
      total: 0,
      pending: 0,
      active: 0,
      completed: 0,
    });

  /* ============================================================
     STAT FILTER
  ============================================================ */

  const [selectedFilter, setSelectedFilter] =
    useState<InstallationFilter>("ALL");

  /* ============================================================
     SEARCH
  ============================================================ */

  const [search, setSearch] =
    useState("");

  /* ============================================================
     PAGINATION
  ============================================================ */

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  /* ============================================================
     SELECTED INSTALLATION
  ============================================================ */

  const [selectedRequest, setSelectedRequest] =
    useState<InstallationRequest | null>(null);

  /* ============================================================
     MODALS
  ============================================================ */

  const [isReviewOpen, setIsReviewOpen] =
    useState(false);

  const [isAssignOpen, setIsAssignOpen] =
    useState(false);

  const [isViewOpen, setIsViewOpen] =
    useState(false);

  const [isDeleteOpen, setIsDeleteOpen] =
    useState(false);

  /* ============================================================
     DELETE
  ============================================================ */

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  /* ============================================================
     LOAD INSTALLATION REQUESTS
  ============================================================ */

  const loadRequests = useCallback(
    async () => {
      try {
        setLoading(true);

        /* --------------------------------------------------------
           BUILD API PARAMETERS
        -------------------------------------------------------- */

        const params: Record<string, string> = {
          page: String(page),
        };

        /* --------------------------------------------------------
           SEARCH
        -------------------------------------------------------- */

        if (search.trim()) {
          params.search = search.trim();
        }

        /* --------------------------------------------------------
           STAT FILTER
        -------------------------------------------------------- */

        if (selectedFilter === "PENDING") {
          params.status_group = "pending";
        }

        if (selectedFilter === "ACTIVE") {
          params.status_group = "active";
        }

        if (selectedFilter === "COMPLETED") {
          params.status_group = "completed";
        }

        /* --------------------------------------------------------
           API REQUEST
        -------------------------------------------------------- */

        const response =
          await installationsService.getRequests(
            params
          );

        /* ========================================================
           PAGINATED RESPONSE
        ======================================================== */

        if (
          response &&
          typeof response === "object" &&
          "results" in response
        ) {
          const paginated =
            response as {
              count: number;
              next: string | null;
              previous: string | null;
              results: InstallationRequest[];
            };

          /* ------------------------------------------------------
             REQUESTS
          ------------------------------------------------------ */

          setRequests(
            paginated.results || []
          );

          /* ------------------------------------------------------
             TOTAL PAGES
             
             Change PAGE_SIZE if your Django
             REST_FRAMEWORK PAGE_SIZE is different.
          ------------------------------------------------------ */

          const PAGE_SIZE = 10;

          setTotalPages(
            Math.max(
              1,
              Math.ceil(
                (paginated.count || 0) /
                  PAGE_SIZE
              )
            )
          );

          return;
        }

        /* ========================================================
           NON-PAGINATED RESPONSE
        ======================================================== */

        if (Array.isArray(response)) {
          setRequests(response);

          setTotalPages(1);

          return;
        }

        /* ========================================================
           EMPTY RESPONSE
        ======================================================== */

        setRequests([]);

        setTotalPages(1);
      } catch (error) {
        console.error(
          "Installation API Error:",
          error
        );

        setRequests([]);

        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    },
    [
      page,
      search,
      selectedFilter,
    ]
  );

  /* ============================================================
     LOAD INSTALLATION STATISTICS
  ============================================================ */

  const loadStatistics = useCallback(
    async () => {
      try {
        const data =
          await installationsService.getStatistics();

        setStatistics({
          total: Number(
            data?.total ?? 0
          ),

          pending: Number(
            data?.pending ?? 0
          ),

          active: Number(
            data?.active ?? 0
          ),

          completed: Number(
            data?.completed ?? 0
          ),
        });
      } catch (error) {
        console.error(
          "Installation Statistics API Error:",
          error
        );

        /*
         * Don't break the page if the
         * statistics endpoint fails.
         */

        setStatistics({
          total: 0,
          pending: 0,
          active: 0,
          completed: 0,
        });
      }
    },
    []
  );

  /* ============================================================
     LOAD TECHNICIANS
  ============================================================ */

  const loadTechnicians = useCallback(
    async () => {
      try {
        setTechnicianLoading(true);

        const response =
          await technicianService.getTechnicians();

        /* --------------------------------------------------------
           ARRAY RESPONSE
        -------------------------------------------------------- */

        if (Array.isArray(response)) {
          setTechnicians(response);

          return;
        }

        /* --------------------------------------------------------
           PAGINATED RESPONSE
        -------------------------------------------------------- */

        if (
          response &&
          typeof response === "object" &&
          "results" in response
        ) {
          const data =
            response as {
              results: Technician[];
            };

          setTechnicians(
            data.results || []
          );

          return;
        }

        /* --------------------------------------------------------
           INVALID RESPONSE
        -------------------------------------------------------- */

        setTechnicians([]);
      } catch (error) {
        console.error(
          "Technician API Error:",
          error
        );

        setTechnicians([]);
      } finally {
        setTechnicianLoading(false);
      }
    },
    []
  );

  /* ============================================================
     INITIAL / FILTER / SEARCH / PAGE LOAD
  ============================================================ */

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  /* ============================================================
     LOAD STATISTICS
  ============================================================ */

  useEffect(() => {
    loadStatistics();
  }, [loadStatistics]);

  /* ============================================================
     LOAD TECHNICIANS WHEN ASSIGN MODAL OPENS
  ============================================================ */

  useEffect(() => {
    if (isAssignOpen) {
      loadTechnicians();
    }
  }, [
    isAssignOpen,
    loadTechnicians,
  ]);

  /* ============================================================
     STAT FILTER
  ============================================================ */

  const handleFilterChange = (
    filter: InstallationFilter
  ) => {
    /*
     * Clicking the currently active
     * card again returns to ALL.
     */

    setSelectedFilter((current) =>
      current === filter
        ? "ALL"
        : filter
    );

    /*
     * Always return to page 1
     * when filter changes.
     */

    setPage(1);
  };

  /* ============================================================
     SEARCH
  ============================================================ */

  const handleSearch = (
    value: string
  ) => {
    setSearch(value);

    /*
     * Search should always start
     * from the first page.
     */

    setPage(1);
  };

  /* ============================================================
     VIEW INSTALLATION
  ============================================================ */

  const openView = (
    request: InstallationRequest
  ) => {
    setSelectedRequest(request);

    setIsViewOpen(true);
  };

  /* ============================================================
     REVIEW INSTALLATION
  ============================================================ */

  const openReview = (
    request: InstallationRequest
  ) => {
    setSelectedRequest(request);

    setIsReviewOpen(true);
  };

  /* ============================================================
     ASSIGN TECHNICIAN
  ============================================================ */

  const openAssign = (
    request: InstallationRequest
  ) => {
    setSelectedRequest(request);

    setIsAssignOpen(true);
  };

  /* ============================================================
     DELETE MODAL
  ============================================================ */

  const openDelete = (
    request: InstallationRequest
  ) => {
    setSelectedRequest(request);

    setIsDeleteOpen(true);
  };

  /* ============================================================
     DELETE INSTALLATION
  ============================================================ */

  const handleDelete = async () => {
    if (!selectedRequest) {
      return;
    }

    const id = String(
      selectedRequest.id
    );

    try {
      setDeletingId(id);

      /* --------------------------------------------------------
         DELETE API
      -------------------------------------------------------- */

      await installationsService.deleteRequest(
        id
      );

      /* --------------------------------------------------------
         REMOVE IMMEDIATELY FROM CURRENT UI
      -------------------------------------------------------- */

      setRequests((current) =>
        current.filter(
          (request) =>
            String(request.id) !== id
        )
      );

      /* --------------------------------------------------------
         CLOSE MODAL
      -------------------------------------------------------- */

      setIsDeleteOpen(false);

      setSelectedRequest(null);

      /* --------------------------------------------------------
         REFRESH LIST + STATISTICS
      -------------------------------------------------------- */

      await Promise.all([
        loadRequests(),
        loadStatistics(),
      ]);
    } catch (error) {
      console.error(
        "Delete installation failed:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete installation request."
      );
    } finally {
      setDeletingId(null);
    }
  };

  /* ============================================================
     REVIEW SUCCESS
  ============================================================ */

  const handleReviewSuccess =
    async () => {
      setIsReviewOpen(false);

      setSelectedRequest(null);

      await Promise.all([
        loadRequests(),
        loadStatistics(),
      ]);
    };

  /* ============================================================
     ASSIGN SUCCESS
  ============================================================ */

  const handleAssignSuccess =
    async () => {
      setIsAssignOpen(false);

      setSelectedRequest(null);

      await Promise.all([
        loadRequests(),
        loadStatistics(),
      ]);
    };

  /* ============================================================
     CLOSE REVIEW MODAL
  ============================================================ */

  const closeReview = () => {
    setIsReviewOpen(false);

    setSelectedRequest(null);
  };

  /* ============================================================
     CLOSE ASSIGN MODAL
  ============================================================ */

  const closeAssign = () => {
    setIsAssignOpen(false);

    setSelectedRequest(null);
  };

  /* ============================================================
     CLOSE VIEW MODAL
  ============================================================ */

  const closeView = () => {
    setIsViewOpen(false);

    setSelectedRequest(null);
  };

  /* ============================================================
     CLOSE DELETE MODAL
  ============================================================ */

  const closeDelete = () => {
    /*
     * Don't allow closing while
     * delete request is processing.
     */

    if (deletingId) {
      return;
    }

    setIsDeleteOpen(false);

    setSelectedRequest(null);
  };

  /* ============================================================
     PAGE
  ============================================================ */

  return (
    <main className="w-full">
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          space-y-4
          px-3
          py-4

          sm:space-y-5
          sm:px-5
          sm:py-5

          md:px-6

          lg:space-y-6
          lg:px-8
          lg:py-6

          xl:px-10
        "
      >
        {/* ======================================================
            HEADER
        ====================================================== */}

        <InstallationHeader />

        {/* ======================================================
            STATISTICS
        ====================================================== */}

        <InstallationStats
          total={statistics.total}
          pending={statistics.pending}
          active={statistics.active}
          completed={statistics.completed}
          selectedFilter={selectedFilter}
          onFilterChange={
            handleFilterChange
          }
        />

        {/* ======================================================
            SEARCH
        ====================================================== */}

        <InstallationSearch
          value={search}
          onChange={handleSearch}
        />

        {/* ======================================================
            INSTALLATION LIST
        ====================================================== */}

        <InstallationList
          requests={requests}
          loading={loading}
          onView={openView}
          onReview={openReview}
          onAssign={openAssign}
          onDelete={openDelete}
          deletingId={deletingId}
        />

        {/* ======================================================
            PAGINATION
        ====================================================== */}

        {totalPages > 1 && (
          <InstallationPagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}

        {/* ======================================================
            REVIEW MODAL
        ====================================================== */}

        {selectedRequest && (
          <InstallationReviewModal
            request={selectedRequest}
            isOpen={isReviewOpen}
            onClose={closeReview}
            onSuccess={
              handleReviewSuccess
            }
          />
        )}

        {/* ======================================================
            ASSIGN TECHNICIAN MODAL
        ====================================================== */}

        {selectedRequest && (
          <InstallationAssignModal
            request={selectedRequest}
            technicians={technicians}
            loading={
              technicianLoading
            }
            isOpen={isAssignOpen}
            onClose={closeAssign}
            onSuccess={
              handleAssignSuccess
            }
          />
        )}

        {/* ======================================================
            DETAILS MODAL
        ====================================================== */}

        {selectedRequest && (
          <InstallationDetailsModal
            request={selectedRequest}
            isOpen={isViewOpen}
            onClose={closeView}
          />
        )}

        {/* ======================================================
            DELETE MODAL
        ====================================================== */}

        {selectedRequest && (
          <DeleteInstallationModal
            request={selectedRequest}
            isOpen={isDeleteOpen}
            loading={
              deletingId ===
              String(
                selectedRequest.id
              )
            }
            onClose={closeDelete}
            onConfirm={handleDelete}
          />
        )}
      </div>
    </main>
  );
}