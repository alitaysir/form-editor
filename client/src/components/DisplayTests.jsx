// /src/components/DisplayTests.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
  background-color: #f4f4f4;
`;

const QuestionCard = styled.div`
  padding: 30px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  h3 {
    font-size: 1.5rem;
    color: #333;
  }
`;

const DisplayTests = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5001/api/test')  // Replace with your backend API
      .then(response => {
        setTests(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching tests:', error);
      });
  }, []);

  return (
    <GridContainer>
      {loading ? (
        <p>Loading tests...</p>
      ) : (
        tests.map((test) => (
          <Link key={test._id} to={`/answer-test/${test._id}`} style={{ textDecoration: 'none' }}>
            <QuestionCard>
              <h3>{test.categorize.desc || 'Test ' + test._id}</h3>
            </QuestionCard>
          </Link>
        ))
      )}
    </GridContainer>
  );
};

export default DisplayTests;
