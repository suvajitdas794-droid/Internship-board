const internships = [
  {id:1,title:'Frontend Developer Intern',company:'PixelCraft Studio',initials:'PC',logo:'logo-green',category:'Technology',location:'Remote',style:'Remote',stipend:12000,paid:true,duration:'3 months',posted:1,level:'Beginner friendly',description:'Help turn thoughtful designs into responsive, accessible web experiences. You’ll work alongside developers who enjoy sharing what they know.',responsibilities:['Build and refine responsive UI components with HTML, CSS, and JavaScript.','Test pages on different screen sizes and improve accessibility.','Collaborate with designers and developers during code reviews.'],skills:'HTML, CSS, JavaScript fundamentals, curiosity, and a willingness to ask questions.',email:'careers@pixelcraft.example'},
  {id:2,title:'UI/UX Design Intern',company:'Northstar Digital',initials:'N',logo:'logo-purple',category:'Design',location:'Bengaluru',style:'Hybrid',stipend:15000,paid:true,duration:'4 months',posted:2,level:'Portfolio helpful',description:'Support a small product design team as it makes digital tools simpler and more welcoming for users.',responsibilities:['Create wireframes and clickable prototypes.','Help organize user feedback and usability findings.','Prepare design handoff notes for the engineering team.'],skills:'Figma basics, visual hierarchy, empathy for users, and an interest in accessible design.',email:'people@northstar.example'},
  {id:3,title:'Content & Social Media Intern',company:'Goodkind Collective',initials:'GC',logo:'logo-peach',category:'Marketing',location:'Remote',style:'Remote',stipend:8000,paid:true,duration:'3 months',posted:3,level:'Writing focused',description:'Help a purpose-led team tell useful stories across social platforms, newsletters, and its website.',responsibilities:['Draft captions and short-form content ideas.','Research audience trends and track engagement.','Maintain a simple content calendar with the team.'],skills:'Clear writing, attention to detail, social media familiarity, and creative thinking.',email:'hello@goodkind.example'},
  {id:4,title:'Java Developer Intern',company:'CodeHarbor Labs',initials:'CH',logo:'logo-blue',category:'Technology',location:'Delhi NCR',style:'On-site',stipend:18000,paid:true,duration:'6 months',posted:4,level:'Mentorship included',description:'Learn how production applications are built while contributing to small backend features and tests.',responsibilities:['Help implement Java features under mentor guidance.','Write and test REST API endpoints.','Investigate bugs and document fixes.'],skills:'Core Java, OOP concepts, basic SQL, and an interest in backend development.',email:'internships@codeharbor.example'},
  {id:5,title:'Business Research Intern',company:'Fieldnote Advisory',initials:'FA',logo:'logo-yellow',category:'Business',location:'Mumbai',style:'Hybrid',stipend:10000,paid:true,duration:'2 months',posted:5,level:'Research & analysis',description:'Help the research team turn market information into clear, useful insights for clients.',responsibilities:['Gather and organize information from credible sources.','Build concise research summaries and presentation slides.','Support competitor and industry analysis.'],skills:'Research, written communication, spreadsheets, and careful source checking.',email:'talent@fieldnote.example'},
  {id:6,title:'Data Analyst Intern',company:'BrightMetric',initials:'BM',logo:'logo-pink',category:'Technology',location:'Remote',style:'Remote',stipend:14000,paid:true,duration:'3 months',posted:6,level:'Learning support',description:'Assist with cleaning datasets and turning everyday questions into useful charts and reports.',responsibilities:['Clean and validate small datasets.','Create simple dashboards and visual summaries.','Write notes explaining trends and data limitations.'],skills:'Excel or Google Sheets, basic SQL, analytical thinking, and an interest in charts.',email:'jobs@brightmetric.example'},
  {id:7,title:'Graphic Design Intern',company:'Mango Tree Creative',initials:'MT',logo:'logo-green',category:'Design',location:'Delhi NCR',style:'On-site',stipend:0,paid:false,duration:'2 months',posted:7,level:'Portfolio required',description:'Work with a creative team on visual concepts for digital campaigns and brand materials.',responsibilities:['Prepare social graphics and simple campaign assets.','Adapt layouts for multiple digital formats.','Organize design files and respond to feedback.'],skills:'A small portfolio, typography basics, and familiarity with a design tool.',email:'studio@mangotree.example'},
  {id:8,title:'Talent Acquisition Intern',company:'PeopleSpring',initials:'PS',logo:'logo-purple',category:'Business',location:'Hyderabad',style:'Remote',stipend:9000,paid:true,duration:'3 months',posted:8,level:'People focused',description:'Support a friendly recruiting team and learn how candidates are guided through a hiring process.',responsibilities:['Help coordinate interview schedules and candidate updates.','Keep recruitment records accurate and organized.','Assist with internship outreach and job descriptions.'],skills:'Communication, organization, discretion, and basic spreadsheet skills.',email:'careers@peoplespring.example'},
  {id:9,title:'SEO & Growth Intern',company:'Orbit & Oak',initials:'OO',logo:'logo-blue',category:'Marketing',location:'Remote',style:'Remote',stipend:11000,paid:true,duration:'3 months',posted:9,level:'Beginner friendly',description:'Learn practical growth marketing through keyword research, content updates, and performance tracking.',responsibilities:['Research keywords and content opportunities.','Help optimize existing web pages.','Track basic traffic and campaign metrics.'],skills:'Clear writing, curiosity about search, and comfort learning analytics tools.',email:'team@orbitandoak.example'},
  {id:10,title:'Product Operations Intern',company:'Loopline Apps',initials:'L',logo:'logo-peach',category:'Business',location:'Bengaluru',style:'Hybrid',stipend:16000,paid:true,duration:'4 months',posted:10,level:'Cross-team learning',description:'Help a product team keep launches organized and turn user feedback into clear action items.',responsibilities:['Document product feedback and recurring issues.','Maintain release checklists and meeting notes.','Coordinate small tasks across product and support.'],skills:'Communication, structured thinking, and comfort with collaborative documents.',email:'work@loopline.example'}
];
const state = {visible:6, pageSize:6};
const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
const keyword = $('#keyword'), locationSelect = $('#location'), sortBy = $('#sort-by');
const jobList = $('#job-list'), emptyState = $('#empty-state'), summary = $('#results-summary'), totalCount = $('#total-count'), loadMore = $('#load-more');
const formatMoney = amount => amount ? `₹${amount.toLocaleString('en-IN')} <small>/ month</small>` : 'Unpaid <small>/ stipend</small>';
function selectedValues(name){return $$(`input[name="${name}"]:checked`).map(input=>input.value)}
function getFiltered(){
  const q=keyword.value.trim().toLowerCase(), place=locationSelect.value;
  const styles=selectedValues('workstyle'), categories=selectedValues('category'), paid=selectedValues('stipend').includes('paid');
  let list=internships.filter(job=>{
    const searchable=[job.title,job.company,job.category,job.location,job.skills].join(' ').toLowerCase();
    return (!q||searchable.includes(q))&&(!place||job.location===place)&&(!styles.length||styles.includes(job.style))&&(!categories.length||categories.includes(job.category))&&(!paid||job.paid);
  });
  if(sortBy.value==='newest')list.sort((a,b)=>a.posted-b.posted);
  if(sortBy.value==='stipend-high')list.sort((a,b)=>b.stipend-a.stipend);
  return list;
}
function cardTemplate(job){
  const locationLabel=job.location==='Remote'?'Remote':job.location;
  return `<article class="job-card" aria-labelledby="job-title-${job.id}">
    <div class="company-logo ${job.logo}" aria-hidden="true">${job.initials}</div>
    <div class="job-main"><h3 class="job-title" id="job-title-${job.id}">${job.title}</h3><p class="job-company">${job.company} <span aria-hidden="true">·</span> ${locationLabel}</p><div class="job-tags"><span class="tag">${job.category}</span><span class="tag">${job.style}</span><span class="tag">${job.duration}</span>${job.paid?'<span class="tag paid">Paid</span>':'<span class="tag">Unpaid</span>'}</div></div>
    <div class="job-side"><div class="stipend">${formatMoney(job.stipend)}</div><button class="view-button" type="button" data-job-id="${job.id}" aria-label="View details for ${job.title} at ${job.company}">View details ↗</button><span class="job-date">${job.posted===1?'Recently added':`${job.posted} days ago`}</span></div>
  </article>`;
}
function render(){
  const list=getFiltered();
  const shown=list.slice(0,state.visible);
  jobList.innerHTML=shown.map(cardTemplate).join('');
  emptyState.hidden=list.length!==0;
  jobList.hidden=list.length===0;
  loadMore.hidden=list.length<=state.visible;
  totalCount.textContent=list.length;
  summary.innerHTML=list.length?`Showing <strong>${shown.length} of ${list.length} opportunities</strong>`:'No opportunities match your filters';
  jobList.setAttribute('aria-busy','false');
}
function resetAndRender(){state.visible=state.pageSize;render()}
function clearFilters(){keyword.value='';locationSelect.value='';sortBy.value='recommended';$$('.filters input[type="checkbox"]').forEach(input=>input.checked=false);resetAndRender();keyword.focus()}
$('#search-button').addEventListener('click',()=>{resetAndRender();$('#listing-title').scrollIntoView({behavior:'smooth',block:'start'})});
keyword.addEventListener('input',resetAndRender);locationSelect.addEventListener('change',resetAndRender);sortBy.addEventListener('change',resetAndRender);$$('.filters input').forEach(input=>input.addEventListener('change',resetAndRender));
$('#clear-filters').addEventListener('click',clearFilters);$('#empty-clear').addEventListener('click',clearFilters);
loadMore.addEventListener('click',()=>{state.visible+=state.pageSize;render()});
const dialog=$('#details-dialog');
function openDetails(id){
  const job=internships.find(item=>item.id===Number(id));if(!job)return;
  $('#dialog-title').textContent=job.title;$('#dialog-company').textContent=`${job.company} · ${job.location}`;
  $('#dialog-meta').innerHTML=[job.category,job.style,job.duration,job.stipend?`₹${job.stipend.toLocaleString('en-IN')} / month`:'Unpaid'].map(value=>`<span class="tag">${value}</span>`).join('');
  $('#dialog-description').textContent=job.description;$('#dialog-responsibilities').innerHTML=job.responsibilities.map(item=>`<li>${item}</li>`).join('');$('#dialog-skills').textContent=job.skills;
  const apply=$('#apply-link');apply.href=`mailto:${job.email}?subject=${encodeURIComponent(`Internship enquiry: ${job.title}`)}`;apply.setAttribute('aria-label',`Email ${job.company} about ${job.title}`);
  if(typeof dialog.showModal==='function')dialog.showModal();else alert(`${job.title}\n${job.company}\n\n${job.description}`);
}
jobList.addEventListener('click',event=>{const button=event.target.closest('[data-job-id]');if(button)openDetails(button.dataset.jobId)});
$('#dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
render();
