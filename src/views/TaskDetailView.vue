<template>
  <div class="task-detail-container">
    <div class="back-navigation">
      <a href="#" class="back-link">← Back to Project Alpha</a>
    </div>
    
    <div class="task-detail-card">
      <h1 class="task-title">Task #42: Implement Login Page</h1>
      
      <div class="task-properties">
        <div class="property-row">
          <span class="property-label">Status:</span>
          <select class="property-value">
            <option>To-Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
        </div>
        
        <div class="property-row">
          <span class="property-label">Assigned to:</span>
          <select class="property-value">
            <option>User1</option>
            <option>User2</option>
            <option>User3</option>
          </select>
        </div>
        
        <div class="property-row">
          <span class="property-label">Due Date:</span>
          <input type="date" class="property-value" value="2025-10-15" />
        </div>
        
        <div class="property-row">
          <span class="property-label">Labels:</span>
          <div class="property-value labels-container">
            <span class="label">UI</span>
            <span class="label">High Priority</span>
            <button class="add-label-btn">+</button>
          </div>
        </div>
      </div>
      
      <div class="task-description">
        <h3>Description:</h3>
        <p>Create the login page with email and password fields. Include validation and error messages.</p>
        <button class="edit-btn">Edit</button>
      </div>
      
      <div class="task-comments">
        <h3>Comments:</h3>
        <div class="comment">
          <div class="comment-header">
            <span class="comment-author">User2</span>
            <span class="comment-date">Oct 8, 2025</span>
          </div>
          <p class="comment-content">Let's use the new form component library for this.</p>
        </div>
        
        <div class="comment">
          <div class="comment-header">
            <span class="comment-author">User1</span>
            <span class="comment-date">Oct 9, 2025</span>
          </div>
          <p class="comment-content">Good idea. I'll look into it.</p>
        </div>
        
        <div class="new-comment">
          <textarea placeholder="Write a comment..."></textarea>
          <button class="submit-comment-btn">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic will go here
</script>

<style scoped>
.task-detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.back-navigation {
  margin-bottom: 1.5rem;
}

.back-link {
  color: var(--color-primary);
  text-decoration: none;
}

.task-detail-card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.task-title {
  margin-bottom: 1.5rem;
}

.task-properties {
  margin-bottom: 2rem;
}

.property-row {
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
}

.property-label {
  min-width: 120px;
  font-weight: 500;
}

.property-value {
  flex: 1;
}

select, input[type="date"] {
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #e2e8f0;
  min-width: 200px;
}

.labels-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.label {
  background-color: #e2e8f0;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.add-label-btn {
  width: 24px;
  height: 24px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.task-description, .task-comments {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
}

.edit-btn {
  background-color: transparent;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  margin-top: 0.5rem;
}

.comment {
  background-color: #f8fafc;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.comment-author {
  font-weight: 500;
}

.comment-date {
  color: #64748b;
  font-size: 0.875rem;
}

.new-comment {
  margin-top: 1.5rem;
}

.new-comment textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  min-height: 100px;
  margin-bottom: 0.5rem;
}
</style>