import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiExternalLink, FiRefreshCw } from 'react-icons/fi';
import { getFinancialNews } from '../../services/externalServices';
import LoadingSpinner from '../common/LoadingSpinner';
import AnimatedButton from '../common/AnimatedButton';
import { showError } from '../common/Notification';

// Estilos
const NewsContainer = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 24px;
  margin-bottom: 32px;
`;

const NewsHeader = styled.div`
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

const NewsTitle = styled.h2`
  margin: 0;
  color: var(--text-dark);
  font-size: 1.5rem;
  font-weight: 600;
  position: relative;
  padding-left: 16px;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 24px;
    background: linear-gradient(to bottom, var(--primary-color), var(--secondary-color));
    border-radius: 2px;
  }
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const NewsCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const NewsImage = styled.div`
  height: 180px;
  background-image: url(${props => props.src || 'https://via.placeholder.com/300x180?text=No+Image'});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const NewsContent = styled.div`
  padding: 16px;
`;

const NewsHeadline = styled.h3`
  margin: 0 0 8px 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-dark);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NewsSource = styled.div`
  font-size: 0.8rem;
  color: var(--text-medium);
  margin-bottom: 8px;
`;

const NewsDescription = styled.p`
  margin: 0 0 16px 0;
  font-size: 0.9rem;
  color: var(--text-medium);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NewsLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--primary-color);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const NewsDate = styled.div`
  font-size: 0.8rem;
  color: var(--text-light);
  margin-top: 8px;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  border-radius: var(--border-radius);
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 0.9rem;
  flex: 1;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.2);
  }
`;

/**
 * Componente de noticias financieras
 * @returns {JSX.Element} - Componente de noticias financieras
 */
const FinancialNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('finanzas argentina');
  const [searchQuery, setSearchQuery] = useState('finanzas argentina');
  
  // Cargar noticias
  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const articles = await getFinancialNews(query, 6);
        setNews(articles);
      } catch (error) {
        console.error('Error al cargar noticias:', error);
        showError('Error al cargar noticias financieras');
      } finally {
        setLoading(false);
      }
    };
    
    loadNews();
  }, [query]);
  
  // Formatear fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Manejar búsqueda
  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(searchQuery);
  };
  
  return (
    <NewsContainer>
      <NewsHeader>
        <NewsTitle>Noticias Financieras</NewsTitle>
        <AnimatedButton
          variant="outline"
          onClick={() => setQuery(searchQuery)}
          disabled={loading}
        >
          <FiRefreshCw /> Actualizar
        </AnimatedButton>
      </NewsHeader>
      
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Buscar noticias..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
        />
        <AnimatedButton
          onClick={handleSearch}
          disabled={loading}
        >
          Buscar
        </AnimatedButton>
      </SearchContainer>
      
      {loading ? (
        <LoadingSpinner text="Cargando noticias..." />
      ) : (
        <NewsGrid>
          {news.length > 0 ? (
            news.map((article, index) => (
              <NewsCard key={index}>
                <NewsImage src={article.urlToImage} />
                <NewsContent>
                  <NewsHeadline>{article.title}</NewsHeadline>
                  <NewsSource>{article.source.name}</NewsSource>
                  <NewsDescription>{article.description}</NewsDescription>
                  <NewsLink href={article.url} target="_blank" rel="noopener noreferrer">
                    Leer más <FiExternalLink />
                  </NewsLink>
                  <NewsDate>{formatDate(article.publishedAt)}</NewsDate>
                </NewsContent>
              </NewsCard>
            ))
          ) : (
            <div>No se encontraron noticias para "{query}"</div>
          )}
        </NewsGrid>
      )}
    </NewsContainer>
  );
};

export default FinancialNews;
