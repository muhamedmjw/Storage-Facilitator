<template>
  <aside class="sidebar">
    <nav>
      <ul class="nav-links">
        <li>
          <router-link
            to="/"
            class="nav-item"
          >
            <Home class="icon" />
            <span>Home</span>
          </router-link>
        </li>

        <li>
          <router-link
            to="/storages"
            class="nav-item"
          >
            <LayoutGrid class="icon" />
            <span>Storage Units</span>
          </router-link>
        </li> 
        
        <li>
          <router-link
            to="/customers"
            class="nav-item"
          >
            <User class="icon" />
            <span>Customers</span>
          </router-link>
        </li>
                <li>
          <router-link
            to="/transactions"
            class="nav-item"
          >
            <BadgeDollarSign class="icon" />
            <span>Transactions</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { Home, LayoutGrid, User, BadgeDollarSign } from 'lucide-vue-next';
</script>

<style scoped src="../../assets/styles/components/Sidebar.css">

</style>