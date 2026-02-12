import styled from 'styled-components';

const PageLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; 
  min-height: 100vh;
`;

const EventGrid = styled.div`
display: grid;
  gap: 24px; /* Space between cards */
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    width: 100%;
  }
}
`;


const EventCard = styled.div`
width: 320px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  font-family: 'Segoe UI', Roboto, sans-serif;
  display: flex;
  flex-direction: column;

  &:hover {
transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const EventImage = styled.div`
position: relative;
  height: 180px;

  & img {
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const EventCardTitle = styled.div`
  margin: 0 0 10px 0;
  font-size: 1.25rem;
  color: #2f3542;
`;

const EventCardContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;   
`;

const EventCardLocation = styled.div`
  font-size: 0.85rem;
  color: #747d8c;
  margin-bottom: 12px;
`;

const EventCardDescription = styled.p`
  font-size: 0.95rem;
  color: #57606f;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const EventCardDate = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: #ff4757;
  color: white;
  padding: 5px 10px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 0.85rem;
`

const CTAButton = styled.button`
  margin-top: auto;
  text-align: center;
  background: #2f3542;
  color: white;
  text-decoration: none;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  transition: background 0.2s;

  &:hover {
    background: #57606f;
  }
`;

export {
    PageLayout,
    EventGrid,
    EventCard,
    EventImage,
    EventCardTitle,
    EventCardDate,
    EventCardContent,
    EventCardLocation,
    EventCardDescription,
    CTAButton
}