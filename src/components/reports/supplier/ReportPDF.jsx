import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { 
    padding: 30,
    fontFamily: 'Helvetica'
  },
  title: { 
    fontSize: 14,
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  table: { 
    display: 'flex', 
    flexDirection: 'column', 
    width: '100%'
  },
  tableRow: { 
    display: 'flex', 
    flexDirection: 'row', 
    borderBottom: '1px solid #ddd',
    alignItems: 'center'
  },
  tableHeader: { 
    backgroundColor: '#f8f8f8', 
    fontWeight: 'bold'
  },
  tableCell: { 
    paddingVertical: 4,
    paddingHorizontal: 6
  },
});

const ReportPDF = ({ selectedMonths, supplierReports, grandTotal }) => {
  const orientation = selectedMonths.length > 6 ? 'landscape' : 'portrait';
  const usableWidth = orientation === 'portrait' ? 535 : 782;
  
  // Standard font sizes
  const baseFontSize = 8;
  const headerFontSize = 9;
  const titleFontSize = 12;

  // Column widths
  const supplierWidth = 140;
  const totalWidth = 70;
  const monthWidth = Math.max(
    (usableWidth - supplierWidth - totalWidth) / selectedMonths.length,
    50 // Minimum month column width
  );

  const dynamicStyles = StyleSheet.create({
    supplierCell: { 
      width: supplierWidth,
      fontSize: baseFontSize
    },
    monthCell: { 
      width: monthWidth,
      fontSize: baseFontSize,
      textAlign: 'right'
    },
    totalCell: { 
      width: totalWidth,
      fontSize: baseFontSize,
      textAlign: 'right'
    },
    headerText: {
      fontSize: headerFontSize
    },
    titleText: {
      fontSize: titleFontSize
    },
    supplierCode: {
      fontSize: 7,
      color: '#444'
    }
  });

  return (
    <Document>
      <Page size="A4" orientation={orientation} style={styles.page}>
        <Text style={[styles.title, dynamicStyles.titleText]}>
          Supplier Purchase Order Report
        </Text>
        
        <View style={styles.table}>
          {/* Header Row */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, dynamicStyles.supplierCell, dynamicStyles.headerText]}>
              Supplier
            </Text>
            {selectedMonths.map((month) => (
              <Text 
                key={month} 
                style={[styles.tableCell, dynamicStyles.monthCell, dynamicStyles.headerText]}
              >
                {month}
              </Text>
            ))}
            <Text style={[styles.tableCell, dynamicStyles.totalCell, dynamicStyles.headerText]}>
              Total
            </Text>
          </View>

          {/* Supplier Rows */}
          {supplierReports.map((supplier) => (
            <View key={supplier.supplierCode} style={styles.tableRow}>
              <View style={[styles.tableCell, dynamicStyles.supplierCell]}>
                <Text>{supplier.supplierName}</Text>
                <Text style={dynamicStyles.supplierCode}>
                  {supplier.supplierCode}
                </Text>
              </View>
              {selectedMonths.map((month) => (
                <Text 
                  key={month} 
                  style={[styles.tableCell, dynamicStyles.monthCell]}
                >
                  Rs. {supplier.monthlyTotals[month]?.toFixed(2) || '0.00'}
                </Text>
              ))}
              <Text style={[styles.tableCell, dynamicStyles.totalCell]}>
                Rs. {supplier.total?.toFixed(2) || '0.00'}
              </Text>
            </View>
          ))}

          {/* Grand Total Row */}
          {grandTotal !== undefined && (
            <View style={[styles.tableRow, { backgroundColor: '#f8f8f8' }]}>
              <Text style={[
                styles.tableCell, 
                dynamicStyles.supplierCell, 
                { fontWeight: 'bold' }
              ]}>
                Grand Total
              </Text>
              {selectedMonths.map((month) => (
                <Text 
                  key={month} 
                  style={[styles.tableCell, dynamicStyles.monthCell]}
                ></Text>
              ))}
              <Text style={[
                styles.tableCell, 
                dynamicStyles.totalCell, 
                { fontWeight: 'bold' }
              ]}>
                Rs. {grandTotal.toFixed(2)}
              </Text>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default ReportPDF;