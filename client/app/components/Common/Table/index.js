/**
 *
 * Table (Enhanced UI/UX Edition)
 *
 */

import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { CSVExport, Search } from 'react-bootstrap-table2-toolkit';

// UX Upgrade: An empty state container instead of a boring text string
const EmptyTableIndication = () => {
  return (
    <div className='ux-table-empty-state'>
      <div className='empty-icon-box'>📦</div>
      <h4>No Data Records Found</h4>
      <p>There aren't any entries available in this collection right now.</p>
    </div>
  );
};

const { ExportCSVButton } = CSVExport;
const { SearchBar } = Search;

const Table = props => {
  const {
    data,
    columns,
    striped,
    hover,
    condensed,
    csv,
    search,
    clickAction,
    isRowEvents
  } = props;

  // Safe Guarded Callback Action: Prevents application crashes if clickAction is missing
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      if (clickAction) {
        clickAction(row._id, rowIndex);
      } else {
        console.warn('[UX Table Warning]: Row clicked, but no clickAction property was passed.');
      }
    }
  };

  return (
    <ToolkitProvider
      keyField='_id'
      data={data || []} // Safety fallback to prevent crashes if data array is null
      columns={columns}
      exportCSV={csv}
      search={search}
    >
      {toolkitProps => (
        <div className='table-section-container'>
          
          {/* Action Toolbar UI Header */}
          {(csv || search) && (
            <div className='ux-table-toolbar'>
              {search && (
                <div className='ux-search-box-wrapper'>
                  <SearchBar 
                    placeholder="Search database fields..." 
                    {...toolkitProps.searchProps} 
                  />
                </div>
              )}
              {csv && (
                <div className='ux-csv-export-wrapper'>
                  <ExportCSVButton
                    className='input-btn custom-btn-secondary md'
                    {...toolkitProps.csvProps}
                  >
                    📥 Export CSV data
                  </ExportCSVButton>
                </div>
              )}
            </div>
          )}

          {/* Core Content Grid Wrapper */}
          <div className='ux-responsive-table-holder'>
            <BootstrapTable
              {...toolkitProps.baseProps}
              keyField='_id'
              striped={striped}
              hover={hover}
              condensed={condensed}
              noDataIndication={EmptyTableIndication}
              rowEvents={isRowEvents ? rowEvents : undefined}
              classes={`ux-modern-data-table ${isRowEvents ? 'clickable-rows' : ''}`}
            />
          </div>
        </div>
      )}
    </ToolkitProvider>
  );
};

Table.defaultProps = {
  data: [],
  columns: [],
  striped: false,
  hover: true,
  condensed: false,
  csv: false,
  search: false,
  isRowEvents: false
};

export default Table;