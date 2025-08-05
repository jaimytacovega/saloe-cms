// Add some basic interactivity
document.addEventListener('DOMContentLoaded', () => {
  const ctaButton = document.getElementById('ctaButton')
  
  if (ctaButton) {
    ctaButton.addEventListener('click', () => {
      alert('Hello from Saloe CMS! 🚀')
    })
  }
  
  console.log('Saloe CMS is running!')
}) 