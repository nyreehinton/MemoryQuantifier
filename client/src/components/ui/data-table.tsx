import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Search, Filter, RotateCcw } from "lucide-react";

interface DataTableProps<T> {
  data: T[];
  columns: {
    header: string;
    accessorKey: keyof T | ((row: T) => React.ReactNode);
    cell?: (row: T) => React.ReactNode;
  }[];
  searchColumn?: keyof T;
  filterOptions?: {
    column: keyof T;
    options: { label: string; value: string }[];
  }[];
  pagination?: boolean;
  pageSize?: number;
  onRowClick?: (row: T) => void;
}

export function DataTable<T>({
  data,
  columns,
  searchColumn,
  filterOptions,
  pagination = true,
  pageSize = 10,
  onRowClick,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeFilters, setActiveFilters] = React.useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = React.useState(1);
  
  // Filter and search data
  const filteredData = React.useMemo(() => {
    let filtered = [...data];
    
    // Apply search
    if (searchTerm && searchColumn) {
      filtered = filtered.filter((item) => {
        const value = item[searchColumn];
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
      });
    }
    
    // Apply filters
    Object.entries(activeFilters).forEach(([column, value]) => {
      if (value) {
        filtered = filtered.filter((item) => {
          const itemValue = item[column as keyof T];
          if (typeof itemValue === "string") {
            return itemValue === value;
          }
          return false;
        });
      }
    });
    
    return filtered;
  }, [data, searchTerm, activeFilters, searchColumn]);
  
  // Pagination
  const paginatedData = React.useMemo(() => {
    if (!pagination) return filteredData;
    
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize, pagination]);
  
  const totalPages = Math.ceil(filteredData.length / pageSize);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  
  const handleFilterChange = (column: keyof T, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [column]: value,
    }));
    setCurrentPage(1);
  };
  
  const clearFilters = () => {
    setSearchTerm("");
    setActiveFilters({});
    setCurrentPage(1);
  };
  
  const hasActiveFilters = searchTerm || Object.values(activeFilters).some(v => v);
  
  return (
    <div className="space-y-4">
      {(searchColumn || filterOptions) && (
        <div className="flex flex-wrap gap-2">
          {searchColumn && (
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-8 w-[200px] md:w-[300px]"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
          
          {filterOptions && filterOptions.map((filter) => (
            <select
              key={String(filter.column)}
              value={activeFilters[filter.column as string] || ""}
              onChange={(e) => handleFilterChange(filter.column, e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="">All {String(filter.column)}s</option>
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ))}
          
          {hasActiveFilters && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearFilters}
              className="h-10"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear
            </Button>
          )}
        </div>
      )}
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={index}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <TableRow 
                  key={rowIndex}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={onRowClick ? "cursor-pointer hover:bg-muted" : ""}
                >
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex}>
                      {column.cell 
                        ? column.cell(row)
                        : typeof column.accessorKey === "function"
                          ? column.accessorKey(row)
                          : String(row[column.accessorKey] || "")}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * pageSize) + 1}-
            {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
