import React from 'react';
import PropTypes from 'prop-types';

// const MenuRecords = ({ records: [sets, date] }) => (
//   <div>
//     {sets.map((set, index) => (
//       <div>{`${index + 1}set ${set}回`}</div>
//     ))}
//   </div>
// );
// const MenuRecords = ({ menu: { records } }) => (
//   <div>
//     {records.map(record => {
//       return `${record.date}の記録${record}`;
//       // record.sets.map((set, index) => (
//       //   <div>
//       //     {sets.map((set, index) => (
//       //       <div>{`${index + 1}set ${set}回`}</div>
//       //     ))}
//       //   </div>
//       // ));
//     })}
//   </div>
// );

const MenuRecords = ({ menu }) => (
  <div>{menu.records.map((record, index) => record)}</div>
);

// MenuRecords.propTypes = {
//   records: PropTypes.array.isRequired
// };

export default MenuRecords;
