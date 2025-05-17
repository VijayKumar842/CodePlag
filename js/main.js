// main.js - Handles UI interactions and core functionality

document.addEventListener('DOMContentLoaded', function() {
  // UI Elements
  const fetchRepoBtn = document.getElementById('fetchRepoBtn');
  const repoUrlInput = document.getElementById('repoUrl');
  const dropZone = document.getElementById('dropZone');
  const browseBtn = document.getElementById('browseBtn');
  const fileInput = document.getElementById('fileInput');
  const fetchedFilesContainer = document.getElementById('fetchedFiles');
  
  // GitHub repository fetching
  fetchRepoBtn.addEventListener('click', function() {
    const repoUrl = repoUrlInput.value.trim();
    if (!repoUrl) {
      alert('Please enter a valid GitHub repository URL');
      return;
    }
    
    // Show loading state
    fetchRepoBtn.textContent = 'Fetching...';
    fetchRepoBtn.disabled = true;
    
    // Mock API call - In a real implementation, this would call the GitHub API
    setTimeout(() => {
      fetchRepositoryFiles(repoUrl);
      fetchRepoBtn.textContent = 'Fetch Repository';
      fetchRepoBtn.disabled = false;
    }, 1500);
  });
  
  // File upload handling
  browseBtn.addEventListener('click', function() {
    fileInput.click();
  });
  
  fileInput.addEventListener('change', function(e) {
    handleFiles(e.target.files);
  });
  
  // Drag and drop functionality
  dropZone.addEventListener('dragover', function(e) {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });
  
  dropZone.addEventListener('dragleave', function() {
    dropZone.classList.remove('dragover');
  });
  
  dropZone.addEventListener('drop', function(e) {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  });
  
  // Handle file upload
  function handleFiles(files) {
    console.log('Files uploaded:', files);
    
    // In a real implementation, you would process and display the files here
    alert(`${files.length} file(s) uploaded successfully!`);
    
    // Display uploaded files in the fetched files container
    displayUploadedFiles(files);
  }
  
  // Display files fetched from GitHub repository
  function fetchRepositoryFiles(repoUrl) {
    // Extract user and repo name from URL
    const urlParts = repoUrl.split('/');
    const repoName = urlParts[urlParts.length - 1];
    
    // Mock data - In a real implementation, these would come from the GitHub API
    const mockFiles = [
      { name: 'index.js', path: 'index.js', type: 'file' },
      { name: 'utils.js', path: 'utils/utils.js', type: 'file' },
      { name: 'helper.js', path: 'utils/helper.js', type: 'file' },
      { name: 'main.css', path: 'css/main.css', type: 'file' },
      { name: 'README.md', path: 'README.md', type: 'file' }
    ];
    
    displayFetchedFiles(mockFiles, repoName);
  }
  
  // Display fetched repository files
  function displayFetchedFiles(files, repoName) {
    fetchedFilesContainer.innerHTML = '';
    
    const heading = document.createElement('h4');
    heading.textContent = `Files from ${repoName}:`;
    fetchedFilesContainer.appendChild(heading);
    
    files.forEach(file => {
      const fileItem = document.createElement('div');
      fileItem.className = 'file-item';
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = file.path;
      
      const fileIcon = document.createElement('span');
      fileIcon.className = 'file-icon';
      fileIcon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>';
      
      const fileName = document.createElement('span');
      fileName.textContent = file.name;
      
      fileItem.appendChild(checkbox);
      fileItem.appendChild(fileIcon);
      fileItem.appendChild(fileName);
      
      fetchedFilesContainer.appendChild(fileItem);
    });
    
    // Add analyze button
    const btnContainer = document.createElement('div');
    btnContainer.className = 'analyze-btn-container';
    
    const analyzeBtn = document.createElement('button');
    analyzeBtn.className = 'btn';
    analyzeBtn.textContent = 'Analyze Selected Files';
    analyzeBtn.addEventListener('click', analyzeSelectedFiles);
    
    btnContainer.appendChild(analyzeBtn);
    fetchedFilesContainer.appendChild(btnContainer);
  }
  
  // Display uploaded files
  function displayUploadedFiles(files) {
    fetchedFilesContainer.innerHTML = '';
    
    const heading = document.createElement('h4');
    heading.textContent = 'Uploaded Files:';
    fetchedFilesContainer.appendChild(heading);
    
    Array.from(files).forEach(file => {
      const fileItem = document.createElement('div');
      fileItem.className = 'file-item';
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = file.name;
      checkbox.checked = true;
      
      const fileIcon = document.createElement('span');
      fileIcon.className = 'file-icon';
      fileIcon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>';
      
      const fileName = document.createElement('span');
      fileName.textContent = file.name;
      
      fileItem.appendChild(checkbox);
      fileItem.appendChild(fileIcon);
      fileItem.appendChild(fileName);
      
      fetchedFilesContainer.appendChild(fileItem);
    });
    
    // Add analyze button
    const btnContainer = document.createElement('div');
    btnContainer.className = 'analyze-btn-container';
    
    const analyzeBtn = document.createElement('button');
    analyzeBtn.className = 'btn';
    analyzeBtn.textContent = 'Analyze Selected Files';
    analyzeBtn.addEventListener('click', analyzeSelectedFiles);
    
    btnContainer.appendChild(analyzeBtn);
    fetchedFilesContainer.appendChild(btnContainer);
  }
  
  // Trigger analysis of selected files
  function analyzeSelectedFiles() {
    const selectedFiles = Array.from(document.querySelectorAll('.file-item input[type="checkbox"]:checked')).map(checkbox => checkbox.value);
    
    if (selectedFiles.length < 2) {
      alert('Please select at least two files to compare.');
      return;
    }
    
    console.log('Analyzing files:', selectedFiles);
    
    // In a real implementation, this would call the plagiarism detection service
    alert(`Analyzing ${selectedFiles.length} files for code similarities...`);
    
    // Scroll to results section
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
    
    // Mock loading the results
    document.getElementById('similarityGraph').innerHTML = 'Loading analysis results...';
    
    // Simulate delay for analysis processing
    setTimeout(() => {
      // Call the detection visualization function from detection.js
      visualizeDetectionResults();
    }, 2000);
  }
});
