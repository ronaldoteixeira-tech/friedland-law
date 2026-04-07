// â”€â”€â”€ CHART DEFAULTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
Chart.defaults.color = '#6B7280';
Chart.defaults.borderColor = 'rgba(255,255,255,0.05)';
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.font.size = 12;

const goldGrad = (ctx) => {
  const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
  g.addColorStop(0, 'rgba(190,169,94,0.7)');
  g.addColorStop(1, 'rgba(190,169,94,0.05)');
  return g;
};

// â”€â”€â”€ FOLLOWER CHART â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
new Chart(document.getElementById('followerChart'), {
  type: 'line',
  data: {
    labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'May (T)', 'Q3 (T)'],
    datasets: [{
      label: 'Followers',
      data: [5600, 5800, 6000, 6150, 6029, 6687, 7000, 10000],
      borderColor: '#BEA95E',
      borderWidth: 2,
      pointBackgroundColor: '#BEA95E',
      pointRadius: [3,3,3,3,3,5,4,4],
      pointBorderColor: '#060d18',
      pointBorderWidth: 2,
      fill: true,
      backgroundColor: function(ctx) {
        const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 200);
        g.addColorStop(0, 'rgba(190,169,94,0.2)');
        g.addColorStop(1, 'rgba(190,169,94,0)');
        return g;
      },
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#122035',
        titleColor: '#BEA95E',
        bodyColor: '#E5E7EB',
        borderColor: 'rgba(190,169,94,0.2)',
        borderWidth: 1
      }
    },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#6B7280' } },
      y: {
        grid: { color: 'rgba(255,255,255,0.03)' },
        ticks: { color: '#6B7280', callback: v => v >= 1000 ? (v/1000)+'k' : v }
      }
    }
  }
});

// â”€â”€â”€ BUDGET DONUT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
new Chart(document.getElementById('budgetChart'), {
  type: 'doughnut',
  data: {
    labels: ['Google Ads', 'Meta Ads'],
    datasets: [{
      data: [7380.42, 4607.35],
      backgroundColor: ['#BEA95E', '#1a2d4a'],
      borderColor: ['#BEA95E', '#243d63'],
      borderWidth: 2,
      hoverOffset: 6
    }]
  },
  options: {
    responsive: true,
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#122035',
        titleColor: '#BEA95E',
        bodyColor: '#E5E7EB',
        borderColor: 'rgba(190,169,94,0.2)',
        borderWidth: 1,
        callbacks: {
          label: ctx => ' $' + ctx.raw.toLocaleString('en-US', {minimumFractionDigits:2})
        }
      }
    }
  },
  plugins: [{
    id: 'centerText',
    beforeDraw(chart) {
      const { ctx, width, height } = chart;
      ctx.save();
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = '#BEA95E';
      ctx.font = "600 22px 'Cormorant Garamond', serif";
      ctx.fillText('$11,987', width/2, height/2 - 10);
      ctx.fillStyle = '#6B7280';
      ctx.font = "11px 'Inter', sans-serif";
      ctx.fillText('Total Invested', width/2, height/2 + 14);
      ctx.restore();
    }
  }]
});

// â”€â”€â”€ Q1 SHIFT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
new Chart(document.getElementById('q1Chart'), {
  type: 'bar',
  data: {
    labels: ['January', 'February', 'March'],
    datasets: [
      {
        label: 'General Awareness',
        data: [85, 80, 20],
        backgroundColor: '#1a2d4a',
        borderRadius: 4
      },
      {
        label: 'Jacksonville Focus',
        data: [15, 20, 60],
        backgroundColor: '#BEA95E',
        borderRadius: 4
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      x: { stacked: true, grid: { display: false }, ticks: { color: '#6B7280' } },
      y: {
        stacked: true,
        grid: { color: 'rgba(255,255,255,0.03)' },
        ticks: { color: '#6B7280', callback: v => v+'%' },
        max: 100
      }
    },
    plugins: {
      legend: {
        display: true,
        labels: { color: '#9CA3AF', boxWidth: 10, boxHeight: 10 }
      },
      tooltip: {
        backgroundColor: '#122035',
        titleColor: '#BEA95E',
        bodyColor: '#E5E7EB',
        borderColor: 'rgba(190,169,94,0.2)',
        borderWidth: 1,
        callbacks: { label: ctx => ' ' + ctx.dataset.label + ': ' + ctx.raw + '%' }
      }
    }
  }
});

// â”€â”€â”€ META CHART â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
new Chart(document.getElementById('metaChart'), {
  type: 'bar',
  data: {
    labels: ['"At Friedland Law" CPV', 'WA Conversations (unit)', 'Total Investment ($k)'],
    datasets: [{
      data: [0.33, 22, 4.6],
      backgroundColor: ['rgba(31,193,107,0.3)', 'rgba(190,169,94,0.3)', 'rgba(36,61,99,0.6)'],
      borderColor: ['#1FC16B', '#BEA95E', '#243d63'],
      borderWidth: 1,
      borderRadius: 4
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false }, tooltip: { backgroundColor: '#122035', titleColor: '#BEA95E', bodyColor: '#E5E7EB', borderColor: 'rgba(190,169,94,0.2)', borderWidth: 1 } },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#6B7280', font: { size: 10 } } },
      y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#6B7280' } }
    }
  }
});

// â”€â”€â”€ GOOGLE CHART â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
new Chart(document.getElementById('googleChart'), {
  type: 'bar',
  data: {
    labels: ['Brand CPA ($)', 'Generic CPL ($)', 'JX Delivery ($)', 'Brand Conv.'],
    datasets: [{
      data: [67.69, 472.73, 9.42, 12],
      backgroundColor: ['rgba(190,169,94,0.4)', 'rgba(190,169,94,0.2)', 'rgba(229,62,62,0.3)', 'rgba(31,193,107,0.3)'],
      borderColor: ['#BEA95E', '#a8904f', '#E53E3E', '#1FC16B'],
      borderWidth: 1,
      borderRadius: 4
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false }, tooltip: { backgroundColor: '#122035', titleColor: '#BEA95E', bodyColor: '#E5E7EB', borderColor: 'rgba(190,169,94,0.2)', borderWidth: 1 } },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#6B7280', font: { size: 10 } } },
      y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#6B7280' } }
    }
  }
});

// â”€â”€â”€ INTERSECTION OBSERVER (fade-up) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// â”€â”€â”€ NAV DOTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const sections = document.querySelectorAll('section[id]');
const dots = document.querySelectorAll('.nav-dot[data-section]');

const secObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      dots.forEach(d => d.classList.remove('active'));
      const active = document.querySelector(`.nav-dot[data-section="${e.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => secObserver.observe(s));

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const id = dot.dataset.section;
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  });
});
