import { FaTrash, FaEdit } from 'react-icons/fa';

type ActivityProps = {
  title: string;
  description: string;
  status: string;
  assignee: string;
  startDate: string;
  endDate: string;
};

export function AcyivityDeatail ({ title, description, status, assignee,startDate,endDate  }:ActivityProps) {
    return (
        <div style={{ 
          padding: '1.25rem', 
          fontFamily: 'monospace', 
          maxWidth: '30rem', // เท่ากับ 600px
          margin: '3rem auto', // เท่ากับ 50px
          border: '1px solid #ddd',
          borderRadius: '0.625rem', // เท่ากับ 10px
          boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)' // เท่ากับ 0 4px 8px
        }}>
          <header style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '1.25rem' // เท่ากับ 20px
          }}>
            <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{title}</h2> {/* เท่ากับ 24px */}
            <div>
              <button style={{ marginRight: '0.625rem', fontSize: '1rem' }}><FaTrash /></button> {/* เท่ากับ 16px */}
              <button style={{ fontSize: '1rem' }}><FaEdit /></button> {/* เท่ากับ 16px */}
            </div>
          </header>
          <hr />
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{description}</h3> {/* เท่ากับ 20px */}
            <ul style={{ listStyleType: 'none', padding: 0, lineHeight: '1.8' }}>
              <li style={{ display: 'flex', alignItems: 'center', fontSize: '1.125rem', marginBottom: '0.625rem' }}>
                <span style={{ color: 'brown', marginRight: '0.625rem' }}>●</span> {status}
              </li>
              <li style={{ display: 'flex', alignItems: 'center', fontSize: '1.125rem', marginBottom: '0.625rem' }}>
                <span style={{ color: 'brown', marginRight: '0.625rem' }}>●</span> Assign to <a href="/" style={{ color: 'blue' }}>{assignee}</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', fontSize: '1.125rem' }}>
                <span style={{ color: 'brown', marginRight: '0.625rem' }}>●</span> Date: {startDate} - {endDate}
              </li>
            </ul>
          </div>
        </div>
      );
    };