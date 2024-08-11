document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const uploadButton = document.getElementById('uploadButton');
    const uploadForm = document.getElementById('uploadForm');

    // Trigger file input when clicking on the Upload button
    uploadButton.addEventListener('click', function(e) {
        e.preventDefault();
        fileInput.click();
    });

    // Handle file selection and submit the form
    fileInput.addEventListener('change', function() {
        if (fileInput.files.length > 0) {
            uploadForm.submit();
        }
    });

    // Download functionality - redirect to file list
    const downloadButton = document.getElementById('downloadButton');

    downloadButton.addEventListener('click', function(e) {
        e.preventDefault();
        // Redirect to the route that lists files
        window.location.href = '/files';
    });
});