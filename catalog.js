window.addEventListener('load', function() {
  var modal = document.getElementById('software-modal')
  var closeBtn = document.querySelector('.close-btn')
  var modalImg = document.getElementById('modal-software-img')
  var modalTitle = document.getElementById('modal-software-title')
  var modalTags = document.getElementById('modal-software-tags')
  var modalDesc = document.querySelector('#modal-software-description p')
  var modalFeatures = document.querySelector('#modal-software-features ul')
  var modalLink = document.querySelector('#modal-software-link a')
  var grid = document.getElementById('software-grid')
  var categoryTitle = document.querySelector('.main-content h2')
  var categoryFilter = document.getElementById('category-filter')

  if (!grid || !categoryFilter) return

  var tools = []
  var categories = []
  var activeCategory = '推荐'

  function renderTags(container, tags) {
    container.innerHTML = ''
    tags.forEach(function(t) {
      var span = document.createElement('span')
      span.className = 'tag'
      span.textContent = t
      container.appendChild(span)
    })
  }

  function createCard(item) {
    var card = document.createElement('div')
    card.className = 'software-card'
    card.setAttribute('data-category', item.category)
    var imgBox = document.createElement('div')
    imgBox.className = 'software-img'
    var img = document.createElement('img')
    img.src = item.image
    img.alt = item.name
    img.loading = 'lazy'
    imgBox.appendChild(img)
    var info = document.createElement('div')
    info.className = 'software-info'
    var h3 = document.createElement('h3')
    h3.textContent = item.name
    var p = document.createElement('p')
    p.textContent = item.desc
    var tagsBox = document.createElement('div')
    tagsBox.className = 'software-tags'
    renderTags(tagsBox, [item.category, item.payment].concat(item.tags || []))
    var a = document.createElement('a')
    a.href = '#software-modal'
    a.className = 'btn btn-secondary'
    a.setAttribute('data-software', item.id)
    a.textContent = '了解更多'
    info.appendChild(h3)
    info.appendChild(p)
    info.appendChild(tagsBox)
    info.appendChild(a)
    card.appendChild(imgBox)
    card.appendChild(info)
    return card
  }

  function renderGrid(list) {
    grid.innerHTML = ''
    list.forEach(function(item) {
      grid.appendChild(createCard(item))
    })
  }

  function buildCategories() {
    categories = ['推荐', '全部', '系统工具', '办公', '优化工具']
    categoryFilter.innerHTML = ''
    categories.forEach(function(c) {
      var btn = document.createElement('button')
      btn.className = 'filter-btn' + (c === '推荐' ? ' active' : '')
      btn.setAttribute('data-category', c)
      btn.textContent = c
      btn.addEventListener('click', function() {
        var allBtns = categoryFilter.querySelectorAll('.filter-btn')
        allBtns.forEach(function(b) { b.classList.remove('active') })
        this.classList.add('active')
        activeCategory = this.getAttribute('data-category')
        applyFilters()
      })
      categoryFilter.appendChild(btn)
    })
  }

  

  function applyFilters() {
    if (categoryTitle) {
      categoryTitle.textContent = activeCategory === '全部' ? '全部分类' : activeCategory
    }
    var list = tools.filter(function(t) {
      var catMatch = false
      if (activeCategory === '推荐') {
        catMatch = t.recommend === true
      } else if (activeCategory === '全部') {
        catMatch = true
      } else {
        catMatch = t.category === activeCategory
      }
      return catMatch
    })
    renderGrid(list)
  }

  

  


  grid.addEventListener('click', function(e) {
    var target = e.target
    var link = target.closest('.btn.btn-secondary')
    if (!link) return
    e.preventDefault()
    var id = link.getAttribute('data-software')
    var item = tools.find(function(t) { return t.id === id })
    if (!item) return
    modalImg.src = item.image
    modalImg.alt = item.name
    modalTitle.textContent = item.name
    renderTags(modalTags, [item.category, item.payment].concat(item.tags || []))
    modalDesc.textContent = item.desc
    modalFeatures.innerHTML = ''
    (item.features || []).forEach(function(f) {
      var li = document.createElement('li')
      li.textContent = f
      modalFeatures.appendChild(li)
    })
    modalLink.href = item.link || '#'
    modal.classList.add('active')
  })

  closeBtn.addEventListener('click', function() { modal.classList.remove('active') })
  window.addEventListener('click', function(e) { if (e.target === modal) modal.classList.remove('active') })


  fetch('data/tools.json')
    .then(function(r) { return r.json() })
    .then(function(json) {
      tools = json
      buildCategories()
      applyFilters()
    })
})
