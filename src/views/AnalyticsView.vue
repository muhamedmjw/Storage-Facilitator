<template>
  <div class="analytics-container">
    <h1>Analytics</h1>
    
    <div class="analytics-cards">
      <div class="analytics-card">
        <h3>Task Completion</h3>
        <p class="analytics-value">
          65%
        </p>
        <p class="analytics-subtitle">
          Tasks completed this month
        </p>
        <div class="progress-bar">
          <div
            class="progress"
            style="width: 65%"
          />
        </div>
      </div>
      
      <div class="analytics-card">
        <h3>Active Projects</h3>
        <p class="analytics-value">
          5
        </p>
        <p class="analytics-subtitle">
          Currently in progress
        </p>
      </div>
      
      <div class="analytics-card">
        <h3>Overdue Tasks</h3>
        <p class="analytics-value">
          3
        </p>
        <p class="analytics-subtitle">
          Needs attention
        </p>
      </div>
    </div>
    
    <div class="analytics-charts">
      <div class="chart-container">
        <h3>Tasks by Project</h3>
        <div class="placeholder-chart">
          <p>Chart will be displayed here</p>
          <p>(Bar chart showing task count per project)</p>
        </div>
      </div>
      
      <div class="chart-container">
        <h3>Completion Trend</h3>
        <div class="placeholder-chart">
          <p>Chart will be displayed here</p>
          <p>(Line chart showing completion rate over time)</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.analytics-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.analytics-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.analytics-card {
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.analytics-value {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 1rem 0 0.5rem;
  color: var(--color-primary);
}

.analytics-subtitle {
  color: #64748b;
  margin-bottom: 1rem;
}

.progress-bar {
  height: 8px;
  background-color: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: var(--color-primary);
}

.analytics-charts {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.chart-container {
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.placeholder-chart {
  height: 300px;
  background-color: #f8fafc;
  border: 1px dashed #e2e8f0;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  color: #64748b;
}
</style>