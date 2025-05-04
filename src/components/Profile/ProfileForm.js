import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiUser, FiSave, FiUpload } from 'react-icons/fi';
import { getUserProfile, upsertUserProfile, updateUserAvatar } from '../../services/profileService';
import { useAuth } from '../../contexts/AuthContext';

const ProfileContainer = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 32px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const ProfileTitle = styled.h2`
  color: var(--text-dark);
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 0.95rem;
  color: var(--text-medium);
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  color: var(--text-dark);
  background-color: var(--bg-light);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: var(--bg-medium);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  svg {
    font-size: 2rem;
    color: var(--text-light);
  }
`;

const AvatarUpload = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const UploadButton = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: var(--bg-medium);
  color: var(--text-medium);
  border: none;
  padding: 8px 16px;
  border-radius: var(--border-radius);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all var(--transition-speed);
  
  &:hover {
    background-color: var(--bg-dark);
  }
  
  input {
    display: none;
  }
`;

const UploadInfo = styled.span`
  font-size: 0.8rem;
  color: var(--text-light);
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all var(--transition-speed);
  
  &:hover {
    background-color: var(--primary-dark);
  }
  
  &:disabled {
    background-color: var(--text-light);
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: var(--danger-color);
  font-size: 0.9rem;
  margin-top: 16px;
  padding: 8px 12px;
  background-color: rgba(239, 68, 68, 0.1);
  border-radius: var(--border-radius);
  text-align: center;
`;

const SuccessMessage = styled.div`
  color: var(--success-color);
  font-size: 0.9rem;
  margin-top: 16px;
  padding: 8px 12px;
  background-color: rgba(34, 197, 94, 0.1);
  border-radius: var(--border-radius);
  text-align: center;
`;

const ProfileForm = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    avatar_url: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const userProfile = await getUserProfile();
        
        if (userProfile) {
          setProfile({
            first_name: userProfile.first_name || '',
            last_name: userProfile.last_name || '',
            avatar_url: userProfile.avatar_url || ''
          });
        }
      } catch (err) {
        console.error('Error loading profile:', err);
        setError('Error al cargar el perfil');
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      loadProfile();
    }
  }, [user]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      // Crear una URL temporal para mostrar la vista previa
      const previewUrl = URL.createObjectURL(file);
      setProfile(prev => ({ ...prev, avatar_url: previewUrl }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      setError('');
      setSuccess('');
      
      // Si hay un archivo de avatar, subirlo primero
      if (avatarFile) {
        const avatarUrl = await updateUserAvatar(avatarFile);
        setProfile(prev => ({ ...prev, avatar_url: avatarUrl }));
      }
      
      // Actualizar el perfil
      await upsertUserProfile({
        first_name: profile.first_name,
        last_name: profile.last_name,
        avatar_url: profile.avatar_url
      });
      
      setSuccess('Perfil actualizado correctamente');
      setAvatarFile(null);
    } catch (err) {
      console.error('Error saving profile:', err);
      setError('Error al guardar el perfil');
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <ProfileContainer>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          Cargando perfil...
        </div>
      </ProfileContainer>
    );
  }
  
  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileTitle>Mi Perfil</ProfileTitle>
      </ProfileHeader>
      
      <form onSubmit={handleSubmit}>
        <AvatarContainer>
          <Avatar>
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt="Avatar" />
            ) : (
              <FiUser />
            )}
          </Avatar>
          
          <AvatarUpload>
            <UploadButton>
              <FiUpload /> Subir foto
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleAvatarChange} 
              />
            </UploadButton>
            <UploadInfo>JPG, PNG o GIF. Máximo 2MB.</UploadInfo>
          </AvatarUpload>
        </AvatarContainer>
        
        <FormGroup>
          <Label htmlFor="first_name">Nombre</Label>
          <Input
            type="text"
            id="first_name"
            name="first_name"
            value={profile.first_name}
            onChange={handleChange}
            placeholder="Tu nombre"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="last_name">Apellido</Label>
          <Input
            type="text"
            id="last_name"
            name="last_name"
            value={profile.last_name}
            onChange={handleChange}
            placeholder="Tu apellido"
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            value={user?.email || ''}
            disabled
          />
        </FormGroup>
        
        <SubmitButton type="submit" disabled={saving}>
          {saving ? 'Guardando...' : (
            <>
              <FiSave /> Guardar Cambios
            </>
          )}
        </SubmitButton>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
      </form>
    </ProfileContainer>
  );
};

export default ProfileForm;
