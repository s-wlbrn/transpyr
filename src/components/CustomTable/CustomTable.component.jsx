import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

import './CustomTable.styles.scss';

const CustomTable = ({
  children,
  grow,
  border,
  className = '',
  ...otherAttr
}) => {
  return (
    <Container
      className={`custom-table-container ${grow ? 'table-grow' : ''} ${
        border ? 'table-border' : ''
      }`}
    >
      <table className={`custom-table ${className}`} {...otherAttr}>
        {children}
      </table>
    </Container>
  );
};

const TableRow = ({ children, selected, className = '', ...otherAttr }) => {
  return (
    <Row
      as="tr"
      className={`custom-table-row ${className} ${selected ? 'selected' : ''}`}
      {...otherAttr}
    >
      {children}
    </Row>
  );
};

const TableHeader = ({ children, centered, className = '', ...otherAttr }) => {
  return (
    <Col
      as="th"
      className={`custom-table-header ${className} ${
        centered ? 'centered' : ''
      }`}
      {...otherAttr}
    >
      {children}
    </Col>
  );
};

const TableData = ({ children, centered, className = '', ...otherAttr }) => {
  return (
    <Col
      as="td"
      className={`custom-table-data ${className} ${centered ? 'centered' : ''}`}
      {...otherAttr}
    >
      {children}
    </Col>
  );
};

CustomTable.TableRow = TableRow;
CustomTable.TableHeader = TableHeader;
CustomTable.TableData = TableData;

export default CustomTable;
