/* eslint-disable @typescript-eslint/no-explicit-any */
// components/common/ReusableTable.tsx
import React, { useState } from "react";
import { HiDotsVertical, HiOutlineSearch } from "react-icons/hi";
import { FiFilter } from "react-icons/fi";

export interface Column<T = any> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

export interface ActionMenu<T = any> {
  label: string;
  icon?: React.ReactNode;
  onClick: (item: T) => void;
  className?: string;
}

interface FilterOption {
  key: string;
  label: string;
  options: { value: string; label: string }[];
}

interface ReusableTableProps<T> {
  columns: Column<T>[];
  data: T[];

  page?: number;
  onPageChange?: (page: number) => void;

  actions?: ActionMenu<T>[];

  onLimitChange?: (limit: number) => void;
  onSearch?: (searchTerm: string) => void;
  onFilterChange?: (filters: Record<string, any>) => void;
  filterOptions?: FilterOption[];
  currentLimit?: number;
  totalItems?: number;
  isLoading?: boolean;
  children?: React.ReactNode;
  placeholder?: string;
}

const Table = <T extends Record<string, any>>({
  columns,
  data,
  // page = 1,
  // onPageChange,
  actions,
  onLimitChange,
  onSearch,
  onFilterChange,
  filterOptions,
  currentLimit = 10,
  totalItems = 0,
  isLoading = false,
  children,
  placeholder,
}: ReusableTableProps<T>) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [showFilters, setShowFilters] = useState(false);

  const totalPages = Math.ceil(totalItems / currentLimit);
  console.log(totalPages);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchTerm);
  };

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onLimitChange?.(Number(e.target.value));
  };

  return (
    <div className="w-full">
      {/* Search and Filter Bar */}
      <div className="mb-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </form>

        <div className="flex items-center gap-3">
          {/* Items per page */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show:</span>
            <select
              value={currentLimit}
              onChange={handleLimitChange}
              className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
            >
              {[5, 10, 25, 50, 100].map((limit) => (
                <option key={limit} value={limit}>
                  {limit}
                </option>
              ))}
            </select>
          </div>

          {children}

          {/* Filter button */}
          {filterOptions && filterOptions.length > 0 && (
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <FiFilter className="text-gray-600" />
              <span className="text-sm">Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Options */}
      {showFilters && filterOptions && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filterOptions.map((filter) => (
            <div key={filter.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {filter.label}
              </label>
              <select
                value={filters[filter.key] || ""}
                onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All</option>
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key as string}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
              {actions && actions.length > 0 && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-6 py-4 text-center text-gray-500"
                >
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No data found
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <td
                      key={column.key as string}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {column.render
                        ? column.render(item)
                        : item[column.key as keyof T]}
                    </td>
                  ))}

                  {actions && actions.length > 0 && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 relative">
                      <button
                        onClick={() =>
                          setOpenDropdownId(
                            openDropdownId === item.id
                              ? null
                              : (item.id as string),
                          )
                        }
                        className="text-gray-600 hover:text-gray-900 cursor-pointer"
                      >
                        <HiDotsVertical className="h-5 w-5" />
                      </button>

                      {openDropdownId === item.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                          <div className="py-1">
                            {actions.map((action, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  action.onClick(item);
                                  setOpenDropdownId(null);
                                }}
                                className={`flex items-center gap-2 px-4 py-2 text-sm w-full text-left hover:bg-gray-100 cursor-pointer ${
                                  action.className || "text-gray-700"
                                }`}
                              >
                                {action.icon}
                                {action.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {/* {totalItems > 0 && totalPages > 1 && (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            Showing {(page - 1) * currentLimit + 1} to{" "}
            {Math.min(page * currentLimit, totalItems)} of {totalItems} items
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => onPageChange?.(page - 1)}
              className="px-3 py-1 border rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => onPageChange?.(pageNumber)}
                  className={`px-3 py-1 rounded-md text-sm border ${
                    page === pageNumber
                      ? "bg-blue-600 text-white border-blue-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {pageNumber}
                </button>
              ),
            )}

            <button
              disabled={page === totalPages}
              onClick={() => onPageChange?.(page + 1)}
              className="px-3 py-1 border rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Table;
