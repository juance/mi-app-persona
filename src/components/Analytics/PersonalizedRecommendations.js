import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  FiAlertCircle, 
  FiCheckCircle, 
  FiInfo, 
  FiRefreshCw, 
  FiArrowRight, 
  FiX,
  FiThumbsUp,
  FiTrendingUp,
  FiCalendar,
  FiDollarSign,
  FiTarget
} from 'react-icons/fi';
import { 
  getAllRecommendations, 
  updateRecommendationStatus, 
  getRecommendationStatus 
} from '../../services/recommendationService';
import LoadingSpinner from '../common/LoadingSpinner';
import AnimatedButton from '../common/AnimatedButton';
import { showError, showSuccess } from '../common/Notification';

// Estilos
const RecommendationsContainer = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 24px;
  margin-bottom: 32px;
`;

const RecommendationsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const RecommendationsTitle = styled.h2`
  margin: 0;
  color: var(--text-dark);
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
  
  svg {
    color: var(--primary-color);
  }
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  
  @media (max-width: 768px) {
    overflow-x: auto;
    padding-bottom: 8px;
    margin-bottom: 16px;
  }
`;

const Tab = styled.button`
  background: none;
  border: none;
  padding: 8px 16px;
  font-size: 1rem;
  color: ${props => props.$active ? 'var(--primary-color)' : 'var(--text-medium)'};
  font-weight: ${props => props.$active ? '600' : '400'};
  border-bottom: 2px solid ${props => props.$active ? 'var(--primary-color)' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    color: var(--primary-color);
  }
  
  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.$active ? 'var(--primary-color)' : 'var(--text-light)'};
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 0.8rem;
    margin-left: 8px;
  }
`;

const RecommendationCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 16px;
  margin-bottom: 16px;
  border-left: 4px solid ${props => {
    switch (props.type) {
      case 'success': return 'var(--success-color)';
      case 'warning': return 'var(--warning-color)';
      case 'danger': return 'var(--danger-color)';
      case 'info': return 'var(--info-color)';
      default: return 'var(--primary-color)';
    }
  }};
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const RecommendationTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 1.1rem;
  color: var(--text-dark);
  display: flex;
  align-items: center;
  gap: 8px;
  padding-right: 30px;
  
  svg {
    color: ${props => {
      switch (props.type) {
        case 'success': return 'var(--success-color)';
        case 'warning': return 'var(--warning-color)';
        case 'danger': return 'var(--danger-color)';
        case 'info': return 'var(--info-color)';
        default: return 'var(--primary-color)';
      }
    }};
  }
`;

const RecommendationContent = styled.div`
  margin-bottom: 16px;
  font-size: 0.95rem;
  color: var(--text-medium);
  line-height: 1.5;
`;

const RecommendationActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const DismissButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: var(--text-medium);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px 24px;
  color: var(--text-medium);
  
  h4 {
    margin-bottom: 16px;
    color: var(--text-dark);
  }
  
  p {
    margin-bottom: 24px;
  }
`;

const PriorityBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-left: 8px;
  background-color: ${props => {
    switch (props.priority) {
      case 'high': return 'rgba(255, 99, 132, 0.1)';
      case 'medium': return 'rgba(255, 159, 64, 0.1)';
      case 'low': return 'rgba(75, 192, 192, 0.1)';
      default: return 'rgba(153, 102, 255, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.priority) {
      case 'high': return 'var(--danger-color)';
      case 'medium': return 'var(--warning-color)';
      case 'low': return 'var(--success-color)';
      default: return 'var(--primary-color)';
    }
  }};
`;

/**
 * Componente para mostrar recomendaciones personalizadas
 * @returns {JSX.Element} - Componente de recomendaciones personalizadas
 */
const PersonalizedRecommendations = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [recommendations, setRecommendations] = useState({
    all: [],
    financial: [],
    productivity: []
  });
  const [hasData, setHasData] = useState(false);
  
  // Cargar recomendaciones
  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        setLoading(true);
        
        // Obtener todas las recomendaciones
        const data = await getAllRecommendations();
        
        // Filtrar recomendaciones ya vistas o ignoradas
        const filteredRecommendations = {
          all: filterViewedRecommendations(data.all),
          financial: filterViewedRecommendations(data.financial),
          productivity: filterViewedRecommendations(data.productivity)
        };
        
        setRecommendations(filteredRecommendations);
        
        // Verificar si hay recomendaciones para mostrar
        setHasData(
          filteredRecommendations.all.length > 0 || 
          filteredRecommendations.financial.length > 0 || 
          filteredRecommendations.productivity.length > 0
        );
      } catch (error) {
        console.error('Error al cargar recomendaciones:', error);
        showError('Error al cargar recomendaciones personalizadas');
        setHasData(false);
      } finally {
        setLoading(false);
      }
    };
    
    loadRecommendations();
  }, []);
  
  // Filtrar recomendaciones ya vistas o ignoradas
  const filterViewedRecommendations = (recommendations) => {
    return recommendations.filter(recommendation => {
      const status = getRecommendationStatus(recommendation.id);
      return !status || (status.status !== 'ignored' && status.status !== 'actioned');
    });
  };
  
  // Manejar acción de recomendación
  const handleAction = (recommendation) => {
    // Marcar como accionada
    updateRecommendationStatus(recommendation.id, 'actioned');
    
    // Redirigir a la página correspondiente
    if (recommendation.actionLink) {
      window.location.href = recommendation.actionLink;
    }
    
    // Actualizar estado local
    setRecommendations(prev => {
      const updatedAll = prev.all.filter(r => r.id !== recommendation.id);
      const updatedFinancial = prev.financial.filter(r => r.id !== recommendation.id);
      const updatedProductivity = prev.productivity.filter(r => r.id !== recommendation.id);
      
      return {
        all: updatedAll,
        financial: updatedFinancial,
        productivity: updatedProductivity
      };
    });
    
    showSuccess('Recomendación marcada como completada');
  };
  
  // Manejar descarte de recomendación
  const handleDismiss = (recommendation) => {
    // Marcar como ignorada
    updateRecommendationStatus(recommendation.id, 'ignored');
    
    // Actualizar estado local
    setRecommendations(prev => {
      const updatedAll = prev.all.filter(r => r.id !== recommendation.id);
      const updatedFinancial = prev.financial.filter(r => r.id !== recommendation.id);
      const updatedProductivity = prev.productivity.filter(r => r.id !== recommendation.id);
      
      return {
        all: updatedAll,
        financial: updatedFinancial,
        productivity: updatedProductivity
      };
    });
    
    showSuccess('Recomendación descartada');
  };
  
  // Obtener icono según el tipo de recomendación
  const getRecommendationIcon = (type) => {
    switch (type) {
      case 'success':
        return <FiCheckCircle />;
      case 'warning':
        return <FiAlertCircle />;
      case 'danger':
        return <FiAlertCircle />;
      case 'info':
        return <FiInfo />;
      default:
        return <FiInfo />;
    }
  };
  
  // Obtener icono según la categoría de recomendación
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'trends':
        return <FiTrendingUp />;
      case 'goals':
        return <FiTarget />;
      case 'cashflow':
        return <FiDollarSign />;
      case 'tasks':
      case 'events':
        return <FiCalendar />;
      default:
        return <FiInfo />;
    }
  };
  
  // Renderizar contenido según la pestaña activa
  const renderContent = () => {
    if (loading) {
      return <LoadingSpinner text="Cargando recomendaciones..." />;
    }
    
    const currentRecommendations = recommendations[activeTab] || [];
    
    if (currentRecommendations.length === 0) {
      return (
        <EmptyState>
          <h4>No hay recomendaciones disponibles</h4>
          <p>Actualmente no tenemos recomendaciones personalizadas para ti en esta categoría.</p>
          <AnimatedButton onClick={() => window.location.reload()}>
            <FiRefreshCw /> Actualizar
          </AnimatedButton>
        </EmptyState>
      );
    }
    
    return (
      <>
        {currentRecommendations.map((recommendation) => (
          <RecommendationCard 
            key={recommendation.id} 
            type={recommendation.type}
          >
            <RecommendationTitle type={recommendation.type}>
              {getRecommendationIcon(recommendation.type)} 
              {recommendation.title}
              <PriorityBadge priority={recommendation.priority}>
                {recommendation.priority === 'high' ? 'Alta' : 
                 recommendation.priority === 'medium' ? 'Media' : 'Baja'}
              </PriorityBadge>
            </RecommendationTitle>
            
            <RecommendationContent>
              {recommendation.description}
            </RecommendationContent>
            
            <RecommendationActions>
              <AnimatedButton 
                onClick={() => handleAction(recommendation)}
                variant="primary"
                size="small"
              >
                {recommendation.actionText || 'Ver detalles'} <FiArrowRight />
              </AnimatedButton>
              
              <AnimatedButton 
                onClick={() => handleDismiss(recommendation)}
                variant="outline"
                size="small"
              >
                <FiThumbsUp /> Gracias
              </AnimatedButton>
            </RecommendationActions>
            
            <DismissButton 
              onClick={() => handleDismiss(recommendation)}
              title="Descartar recomendación"
            >
              <FiX />
            </DismissButton>
          </RecommendationCard>
        ))}
      </>
    );
  };
  
  return (
    <RecommendationsContainer>
      <RecommendationsHeader>
        <RecommendationsTitle>
          <FiInfo /> Recomendaciones Personalizadas
        </RecommendationsTitle>
        <AnimatedButton
          variant="outline"
          onClick={() => window.location.reload()}
          disabled={loading}
        >
          <FiRefreshCw /> Actualizar
        </AnimatedButton>
      </RecommendationsHeader>
      
      <TabsContainer>
        <Tab
          $active={activeTab === 'all'}
          onClick={() => setActiveTab('all')}
        >
          Todas <span className="badge">{recommendations.all.length}</span>
        </Tab>
        <Tab
          $active={activeTab === 'financial'}
          onClick={() => setActiveTab('financial')}
        >
          Financieras <span className="badge">{recommendations.financial.length}</span>
        </Tab>
        <Tab
          $active={activeTab === 'productivity'}
          onClick={() => setActiveTab('productivity')}
        >
          Productividad <span className="badge">{recommendations.productivity.length}</span>
        </Tab>
      </TabsContainer>
      
      {renderContent()}
    </RecommendationsContainer>
  );
};

export default PersonalizedRecommendations;
