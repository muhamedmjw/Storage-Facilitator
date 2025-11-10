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
            <span>Home</span>
          </router-link>
        </li>

        <li>
          <router-link
            to="/storages"
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
                y="3"
                width="7"
                height="7"
              />
              <rect
                x="14"
                y="3"
                width="7"
                height="7"
              />
              <rect
                x="14"
                y="14"
                width="7"
                height="7"
              />
              <rect
                x="3"
                y="14"
                width="7"
                height="7"
              />
            </svg>
            <span>Storage Units</span>
          </router-link>
        </li> 
        
        <li>
          <router-link
            to="/customers"
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
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle
                cx="12"
                cy="7"
                r="4"
              />
            </svg>
            <span>Customers</span>
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
  background: linear-gradient(180deg, #ffffff 0%, #fafaf9 100%);
  border-right: 1px solid #e7e5e4;
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
  color: #57534e;
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
  background: linear-gradient(135deg, rgba(0, 81, 255, 0.3) 0%, rgba(0, 18, 97, 0.377) 100%);
  color: #002e5f;
  transform: translateX(4px);
}

.nav-item.router-link-active {
  background: linear-gradient(135deg, #1e1e1e 0%, #002e5f 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(0, 6, 94, 0.3);
}

.nav-item.router-link-active::before {
  content: '';
  position: absolute;
  left: -1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 24px;
  background: #002e5f;
  border-radius: 0 4px 4px 0;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid #e7e5e4;
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
}
</style>