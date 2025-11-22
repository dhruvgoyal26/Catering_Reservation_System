document.querySelectorAll('.service-card button').forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceName = btn.closest('.service-card').querySelector('h3').textContent;
      const encoded = encodeURIComponent(serviceName);
      window.location.href = `contact.html?service=${encoded}`;
    });
  });
  