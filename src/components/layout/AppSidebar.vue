<template>
  <aside class="sidebar">
    <nav>
      <ul class="nav-links">
        <li>
          <router-link
            to="/"
            class="nav-item"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>Dashboard</span>
          </router-link>
        </li>

        <li>
          <router-link
            to="/projects"
            class="nav-item"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
            <span>Projects</span>
          </router-link>
        </li>

        <li>
          <router-link
            to="/calendar"
            class="nav-item"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect
                x="3"
                y="4"
                width="18"
                height="18"
                rx="2"
                ry="2"
              />
              <line
                x1="16"
                y1="2"
                x2="16"
                y2="6"
              />
              <line
                x1="8"
                y1="2"
                x2="8"
                y2="6"
              />
              <line
                x1="3"
                y1="10"
                x2="21"
                y2="10"
              />
            </svg>
            <span>Calendar</span>
          </router-link>
        </li>

        <li>
          <router-link
            to="/analytics"
            class="nav-item"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <line
                x1="12"
                y1="20"
                x2="12"
                y2="10"
              />
              <line
                x1="18"
                y1="20"
                x2="18"
                y2="4"
              />
              <line
                x1="6"
                y1="20"
                x2="6"
                y2="16"
              />
            </svg>
            <span>Analytics</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
</script>

<style scoped>
.sidebar {
  width: 260px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  border-right: 1px solid #e2e8f0;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  position: relative;
  overflow-y: auto;
}

.nav-links {
  list-style: none;
  padding: 1.5rem 1rem;
  margin: 0;
  flex: 1;
}

.nav-links li {
  margin-bottom: 0.5rem;
}

.nav-item {
  text-decoration: none;
  color: #475569;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border-radius: 12px;
  transition: all 0.2s ease;
  position: relative;
}

.nav-item svg {
  flex-shrink: 0;
}

.nav-item:hover {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  color: #667eea;
  transform: translateX(4px);
}

.nav-item.router-link-active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.nav-item.router-link-active::before {
  content: '';
  position: absolute;
  left: -1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 24px;
  background: #667eea;
  border-radius: 0 4px 4px 0;
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid #e2e8f0;
}

.upgrade-card {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  padding: 1.25rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
}

.upgrade-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.upgrade-card h4 {
  color: white;
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
}

.upgrade-card p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.75rem;
  margin: 0 0 0.75rem 0;
}

.upgrade-btn {
  background: white;
  color: #f59e0b;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
}

.upgrade-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
    flex-direction: row;
  }
  
  .nav-links {
    display: flex;
    justify-content: space-around;
    padding: 0.75rem 0.5rem;
    flex: 1;
  }
  
  .nav-links li {
    margin-bottom: 0;
  }
  
  .nav-item {
    flex-direction: column;
    padding: 0.5rem;
    gap: 0.25rem;
    font-size: 0.75rem;
  }
  
  .nav-item span {
    font-size: 0.7rem;
  }
  
  .nav-item.router-link-active::before {
    display: none;
  }
  
  .sidebar-footer {
    display: none;
  }
}
</style>