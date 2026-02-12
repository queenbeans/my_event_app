import styled from 'styled-components';

const PageLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; 
  min-height: 100vh;
  font-family: 'Segoe UI', Roboto, sans-serif;
`;

const EventsPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;

`;

const EventGrid = styled.div`
display: grid;
  gap: 24px;
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

const EmptyStateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 40px;
`;

const EmptyStateContent = styled.div`
  max-width: 450px;
  text-align: center;
  padding: 50px 40px;
  background: #ffffff;
  border-radius: 30px;

  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f2f6;

  & h2 {
    font-size: 1.75rem;
    color: #2d3436;
    margin-bottom: 12px;
    font-weight: 700;
  }

  & p {
    color: #636e72;
    line-height: 1.6;
    margin-bottom: 32px;
  }
`;

const EmptyStateIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 24px;
  display: inline-block;
  filter: drop-shadow(0 10px 10px rgba(0,0,0,0.1));
  animation: pulse 2s ease-in-out infinite;
`;

export {
    PageLayout,
    EventsPageLayout,
    EventGrid,
    EventCard,
    EventImage,
    EventCardTitle,
    EventCardDate,
    EventCardContent,
    EventCardLocation,
    EventCardDescription,
    CTAButton,
    EmptyStateContainer,
    EmptyStateIcon,
    EmptyStateContent
}