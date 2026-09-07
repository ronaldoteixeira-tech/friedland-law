import re

file_path = r'c:\Users\Ronaldo\Desktop\Projetos\friedland\reports\reports\2026\06\index.html'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. & 4. Remove observation about 0 conversion + FL Personal Injury EN — Zero Conversion Alert card

# Remove KPI Card
kpi_card_pattern = r'\s*<div class="kpi-card alert">\s*<div class="kpi-label">FL Personal Injury EN Conv\.</div>[\s\S]*?<div class="kpi-note">EN PI campaign deployed \$324\.78 with zero conversions — immediate action needed</div>\s*</div>'
content = re.sub(kpi_card_pattern, '', content)

# Remove the Panel 'FL Personal Injury EN — Zero Conversion Alert'
panel_pattern = r'\s*<div class="panel fade-up">\s*<div class="panel-title"><span class="dot"></span>FL Personal Injury EN — Zero Conversion Alert</div>[\s\S]*?</div>\s*</div>\s*</div>'
content = re.sub(panel_pattern, '', content)

# Remove from table:
table_row_pattern = r'\s*<tr>\s*<td class="bold">\[FL\] Personal Injury EN</td>[\s\S]*?<td class="red">9\.99%</td>\s*</tr>'
content = re.sub(table_row_pattern, '', content)

# 2. Adjust followers
content = content.replace('<div class="kpi-value gold">~7,400</div>', '<div class="kpi-value gold">9,200</div>')
content = content.replace('<span class="kpi-badge up">Copa content lift</span>', '<span class="kpi-badge up">Goal anticipated</span>')
content = content.replace('+300 vs. May · 168K engajamentos Meta · 2,600 to 10K goal', '168K engagements Meta · Next Milestone = 10k (by end of July)')

# Update text references
content = content.replace('Current Followers (est.)</div>\n        <div class="kpi-value gold">~7,400</div>', 'Current Followers (est.)</div>\n        <div class="kpi-value gold">9,200</div>')
content = content.replace('<div class="kpi-value green">7,500</div>', '<div class="kpi-value green">10k</div>')
content = content.replace('<span class="kpi-badge up">~100 to go</span>', '<span class="kpi-badge up">Goal anticipated</span>')
content = content.replace('<span class="kpi-badge warn">~2,600 to go</span>', '<span class="kpi-badge success">Goal anticipated</span>')

# 3. Change "Copa do Mundo" to "World Cup"
content = content.replace('Copa do Mundo', 'World Cup')
content = content.replace('engajamentos', 'engagements')

# 5. Remove emojis
emojis = ['✓', '⚠', '✅', '🇪🇸', '🎯', '⚽', '📋', '✍️', '📊', '↓', '↑', '🔥']
for e in emojis:
    content = content.replace(e, '')

# 6. Add topic about Meta Ads Leads campaign
meta_ads_topic = """
    <div class="panel fade-up">
      <div class="panel-title"><span class="dot"></span>Meta Ads Lead Generation & Intaker Integration</div>
      <div style="font-size:13px; color:var(--gray-400); margin-bottom:20px; line-height:1.6;">
        A new Meta Ads Lead generation campaign has been successfully built and integrated directly with Intaker. Featuring a 10-question qualification form, this system filters for high-quality cases based on Mirelly's strategic directive. Following a soft launch in June, we expect this integrated pipeline to start generating consistent, pre-qualified demand starting this July.
      </div>
    </div>
"""

insert_target = r'<!-- ═══════════════════════════════════════════════════ ACTION PLAN -->'
content = content.replace(insert_target, meta_ads_topic + '\n' + insert_target)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
