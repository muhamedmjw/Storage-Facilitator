<template>
  <header class="app-header">
    <div class="header-content">
      <div class="logo">
        <div class="logo-icon">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <rect
              width="32"
              height="32"
              rx="8"
              fill="white"
              fill-opacity="0.2"
            />
            <path
              d="M8 12h16M8 16h16M8 20h16M6 8h20v16H6z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <router-link
          to="/"
          class="logo-text"
        >
          <span class="logo-main">Storage</span>
          <span class="logo-sub">Facility Management System</span>
        </router-link>
      </div>
      <div class="header-actions">
        <button class="profile-button">
          <div class="avatar">
            U
          </div>
          <span>Profile</span>
        </button>
        <button class="logout-button">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line
              x1="21"
              y1="12"
              x2="9"
              y2="12"
            />
          </svg>
          Logout
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">

</script>

<style scoped>
.app-header {
  background: linear-gradient(135deg, #1E1E1E 0%, #002e5f 100%);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  height: 70px;
  max-width: 1920px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text {
  display: flex;
  flex-direction: column;
  color: white;
  text-decoration: none;
  line-height: 1.2;
}

.logo-main {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.logo-sub {
  font-size: 0.75rem;
  opacity: 0.9;
  font-weight: 400;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.profile-button {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: all 0.2s;
}

.profile-button:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.avatar {
  width: 20px;
  height: 20px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
}

.logout-button {
  background: rgba(243, 43, 43, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(236, 42, 42, 0.3);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: all 0.2s;
}

.logout-button:hover {
  background: rgba(220, 38, 38, 0.3);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .header-content {
    padding: 0 1rem;
  }
  
  .logo-sub {
    display: none;
  }
  
  .profile-button span,
  .logout-button {
    display: none;
  }
  
  .profile-button {
    width: 40px;
    padding: 0.5rem;
    justify-content: center;
  }
}
</style>