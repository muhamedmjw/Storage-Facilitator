<template>
  <div class="calendar-container">
    <div class="calendar-header">
      <h1>Calendar</h1>
      <button class="add-event-btn">
        + Event
      </button>
    </div>
    
    <div class="view-controls">
      <div class="view-selector">
        <!-- <button class="view-btn active">Month</button>
        <button class="view-btn">Week</button>
        <button class="view-btn">Day</button> -->
      </div>
      <div class="month-selector">
        <button class="month-nav">
          &lt;
        </button>
        <span class="current-month">October 2025</span>
        <button class="month-nav">
          &gt;
        </button>
      </div>
    </div>
    
    <div class="calendar-grid">
      <div class="calendar-header-row">
        <div class="calendar-cell header-cell">
          Sun
        </div>
        <div class="calendar-cell header-cell">
          Mon
        </div>
        <div class="calendar-cell header-cell">
          Tue
        </div>
        <div class="calendar-cell header-cell">
          Wed
        </div>
        <div class="calendar-cell header-cell">
          Thu
        </div>
        <div class="calendar-cell header-cell">
          Fri
        </div>
        <div class="calendar-cell header-cell">
          Sat
        </div>
      </div>
      
      <!-- Week 1 -->
      <div class="calendar-row">
        <div class="calendar-cell empty-cell" />
        <div class="calendar-cell empty-cell" />
        <div class="calendar-cell">
          <div class="date-number">
            1
          </div>
        </div>
        <div class="calendar-cell">
          <div class="date-number">
            2
          </div>
        </div>
        <div class="calendar-cell">
          <div class="date-number">
            3
          </div>
          <div class="event task-due">
            Task Due
          </div>
        </div>
        <div class="calendar-cell">
          <div class="date-number">
            4
          </div>
        </div>
        <div class="calendar-cell">
          <div class="date-number">
            5
          </div>
        </div>
      </div>
      
      <!-- Week 2 -->
      <div class="calendar-row">
        <div class="calendar-cell">
          <div class="date-number">
            6
          </div>
        </div>
        <div class="calendar-cell">
          <div class="date-number">
            7
          </div>
        </div>
        <div class="calendar-cell">
          <div class="date-number">
            8
          </div>
        </div>
        <div class="calendar-cell">
          <div class="date-number">
            9
          </div>
        </div>
        <div class="calendar-cell">
          <div class="date-number">
            10
          </div>
        </div>
        <div class="calendar-cell">
          <div class="date-number">
            11
          </div>
          <div class="event project-due">
            Project Due
          </div>
        </div>
        <div class="calendar-cell">
          <div class="date-number">
            12
          </div>
        </div>
      </div>
      
      <!-- More weeks would follow -->
    </div>
    
    <div class="calendar-legend">
      <div class="legend-item">
        <div class="legend-color task-due" />
        <span>Task Deadline</span>
      </div>
      <div class="legend-item">
        <div class="legend-color project-due" />
        <span>Project Deadline</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.calendar-container {
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.view-controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.view-selector {
  display: flex;
  gap: 0.5rem;
}

.view-btn {
  background-color: transparent;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
}

.view-btn.active {
  background-color: var(--color-primary);
  color: white;
}

.month-selector {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.month-nav {
  background: none;
  border: 1px solid #e2e8f0;
  width: 30px;
  height: 30px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.current-month {
  font-weight: 500;
  min-width: 120px;
  text-align: center;
}

.calendar-grid {
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  overflow: hidden;
}

.calendar-row, .calendar-header-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.calendar-cell {
  border: 1px solid #e2e8f0;
  min-height: 100px;
  padding: 0.5rem;
  position: relative;
}

.header-cell {
  background-color: #f8fafc;
  font-weight: 500;
  text-align: center;
  padding: 1rem 0.5rem;
  min-height: auto;
}

.empty-cell {
  background-color: #f8fafc;
}

.date-number {
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.event {
  font-size: 0.75rem;
  padding: 0.25rem;
  border-radius: 0.25rem;
  margin-bottom: 0.25rem;
  color: white;
}

.task-due {
  background-color: var(--color-primary);
}

.project-due {
  background-color: var(--color-warning);
}

.calendar-legend {
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}
</style>