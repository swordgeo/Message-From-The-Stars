import React from 'react';
import Table from 'react-bootstrap/Table';

function SuggestionsTable({ suggestions }) {
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Word</th>
          <th>Suggestion</th>
          <th>Grade</th>
          <th>Density</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(suggestions).map(([word, associations], index) => (
          <>
            {/* Render the word as a header row */}
            <tr key={index}>
              <td><strong>{word}</strong></td>
              <td colSpan={2}>Associations</td>
              <td></td>
            </tr>
            {/* Map through associations to render each suggestion */}
            {associations.map((association, assocIndex) => (
              <tr key={assocIndex}>
                {/* Indent suggestion rows */}
                <td style={{ paddingLeft: '20px' }}>{association.suggestion}</td>
                <td>{association.grade}</td>
                <td>{association.density.toFixed(2)}</td>
              </tr>
            ))}
          </>
        ))}
      </tbody>
    </Table>
  );
}

export default SuggestionsTable;