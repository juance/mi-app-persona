import React from 'react';
import styled from 'styled-components';
import ProfileForm from '../components/Profile/ProfileForm';
import PreferencesForm from '../components/Profile/PreferencesForm';
import AccessibilitySettings from '../components/Profile/AccessibilitySettings';
import AuditLogs from '../components/Profile/AuditLogs';
import NotificationManager from '../components/common/NotificationManager';

const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ProfileHeader = styled.div`
  margin-bottom: 36px;

  h1 {
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 12px;
    position: relative;
    padding-bottom: 12px;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
      border-radius: 2px;
    }
  }

  p {
    color: var(--text-medium);
    font-size: 1.1rem;
  }
`;

const Profile = () => {
  return (
    <ProfileContainer>
      <ProfileHeader>
        <h1>Mi Perfil</h1>
        <p>Gestiona tu información personal y preferencias</p>
      </ProfileHeader>

      <ProfileForm />
      <PreferencesForm />
      <NotificationManager />
      <AccessibilitySettings />
      <AuditLogs />
    </ProfileContainer>
  );
};

export default Profile;
