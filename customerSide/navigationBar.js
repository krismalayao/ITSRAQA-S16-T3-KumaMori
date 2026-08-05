document.write(`
<style>
/* Navbar Base Styles */
.navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 60px;
    font-family: 'Fredoka', sans-serif;
    background: #f9e2e6;
    height: 103px;
    box-shadow: 0 2px 10px rgba(92,50,20,0.06);
    position: relative;
    z-index: 10;
}
.nav-links { display: flex; gap: 40px; }
.nav-links a {
    text-decoration: none;
    color: #5c3214;
    font-weight: 500;
    position: relative;
    padding-bottom: 4px;
    transition: color .2s;
}
.nav-links a::after {
    content: '';
    position: absolute;
    left: 0; bottom: 0;
    width: 0; height: 2px;
    background: #5c3214;
    transition: width .25s ease;
}
.nav-links a:hover::after,
.nav-links a.active::after { width: 100%; }
.nav-links a.active { font-weight: 700; }
.nav-icons { display: flex; gap: 20px; align-items: center; }
.nav-icons > a > img { height: 24px; transition: transform .2s; }
.nav-icons > a:hover > img { transform: scale(1.15); }

/* Profile Dropdown */
.profile-wrap { position: relative; }
.profile-wrap img { height: 24px; cursor: pointer; transition: transform .2s; display: block; }
.profile-wrap:hover img { transform: scale(1.15); }

.profile-dropdown {
    position: absolute;
    top: calc(100% + 12px);
    right: 0;
    width: 150px;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(92,50,20,0.2);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-6px);
    transition: opacity .2s, transform .2s, visibility .2s;
}
.profile-wrap:hover .profile-dropdown {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}
.profile-dropdown a {
    display: block;
    padding: 12px 20px;
    text-decoration: none;
    font-weight: 700;
    font-size: .95rem;
    text-align: center;
    cursor: pointer;
}
.profile-dropdown .dd-profile {
    background: #ffffff;
    color: #5c3214;
    transition: background .2s;
}
.profile-dropdown .dd-profile:hover { background: #fdf6f2; }
.profile-dropdown .dd-orders {
    background: #ffffff;
    color: #5c3214;
    transition: background .2s;
}
.profile-dropdown .dd-orders:hover { background: #fdf6f2; }
.profile-dropdown .dd-logout {
    background: #f28b82;
    color: #5c3214;
}
.profile-dropdown .dd-logout:hover { background: #ef776d; }

/* Modal Overlays & Cards */
.upm-overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    background: rgba(92, 50, 20, 0.4);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    padding: 20px;
}
.upm-overlay.open { display: flex; }

.upm-card {
    background: #ffffff;
    border: 2px solid #f0c2cb;
    border-radius: 28px;
    width: 100%;
    max-width: 420px;
    padding: 28px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    max-height: 90vh;
    overflow-y: auto;
}

.upm-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px dashed #f0c2cb;
    padding-bottom: 12px;
    margin-bottom: 20px;
}
.upm-title { color: #5c3214; font-size: 1.3rem; font-weight: 700; }
.upm-close { background: none; border: none; font-size: 1.5rem; color: #8c6853; cursor: pointer; }

/* Main Profile Content */
.upm-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.upm-avatar-wrapper {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 3px solid #e8bdc5;
    overflow: hidden;
    margin-bottom: 10px;
    background-color: #f9e2e6;
}
.upm-avatar-img { width: 100%; height: 100%; object-fit: cover; }

.upm-btn-photo {
    background: #eed1d7;
    color: #5c3214;
    border: none;
    padding: 6px 14px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.8rem;
    cursor: pointer;
    margin-bottom: 20px;
    font-family: 'Fredoka', sans-serif;
    transition: background 0.2s;
}
.upm-btn-photo:hover { background: #e0b8c2; }

.upm-info-box {
    width: 100%;
    background: #faf6f4;
    border: 1.5px solid #f0c2cb;
    border-radius: 18px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 20px;
    text-align: left;
}
.upm-info-item { display: flex; flex-direction: column; gap: 2px; }
.upm-info-label { color: #8c6853; font-size: 0.75rem; text-transform: uppercase; font-weight: 700; }
.upm-info-value { color: #5c3214; font-size: 0.95rem; font-weight: 600; }

.upm-action-row {
    display: flex;
    gap: 10px;
    width: 100%;
}

.upm-btn-primary {
    flex: 1;
    background-color: #5c3214;
    color: #ffffff;
    border: none;
    padding: 12px;
    border-radius: 16px;
    font-weight: 700;
    font-size: 0.9rem;
    cursor: pointer;
    font-family: 'Fredoka', sans-serif;
    transition: background-color 0.2s;
}
.upm-btn-primary:hover { background-color: #3b1d0a; }

.upm-btn-secondary {
    flex: 1;
    background-color: #fdf6f2;
    color: #5c3214;
    border: 1.5px solid #f0c2cb;
    padding: 12px;
    border-radius: 16px;
    font-weight: 700;
    font-size: 0.9rem;
    cursor: pointer;
    font-family: 'Fredoka', sans-serif;
    transition: background-color 0.2s;
}
.upm-btn-secondary:hover { background-color: #eed1d7; }

/* Sub-Modal Form Controls */
.upm-form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 14px;
}
.upm-label { color: #5c3214; font-weight: 600; font-size: 0.85rem; }
.upm-input {
    padding: 10px 14px;
    border-radius: 14px;
    border: 2px solid #f0c2cb;
    background-color: #faf6f4;
    color: #5c3214;
    font-weight: 500;
    outline: none;
    font-family: 'Fredoka', sans-serif;
    font-size: 0.9rem;
}
.upm-input:focus { border-color: #5c3214; }

/* Side Toast Notification System */
.nav-toast {
    position: fixed;
    bottom: 25px;
    left: 25px;
    background-color: #d9534f;
    color: #ffffff;
    padding: 14px 22px;
    border-radius: 18px;
    font-size: 0.9rem;
    font-weight: 600;
    box-shadow: 0 8px 20px rgba(92, 50, 20, 0.2);
    display: flex;
    align-items: center;
    gap: 10px;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.3s ease, transform 0.3s ease, background-color 0.3s ease;
    pointer-events: none;
    z-index: 3000;
    font-family: 'Fredoka', sans-serif;
}
.nav-toast.show {
    opacity: 1;
    transform: translateY(0);
}
.nav-toast.success {
    background-color: #2e7d32;
}
.nav-toast.error {
    background-color: #d9534f;
}
</style>

<header class="navbar">
    <nav class="nav-links">
        <a href="userLandingPage.html" data-page="home">Home</a>
        <a href="productsPage.html" data-page="product">Product</a>
        <a href="aboutUsPage.html" data-page="about">About Us</a>
        <a href="faqsPage.html" data-page="faqs">FAQs</a>
    </nav>

    <div class="nav-icons">
        <a href="cartPage.html">
            <img src="../images/cart.png" alt="cart icon">
        </a>

        <div class="profile-wrap">
            <img src="../images/profile.png" alt="user icon">
            <div class="profile-dropdown">
                <a onclick="openUserProfileModal()" class="dd-profile">Profile</a>
                <a href="orderTrackingPage.html" class="dd-orders">Orders</a>
                <a href="../publicPages/loginPage.html" class="dd-logout" id="logoutLink">Log Out</a>
            </div>
        </div>
    </div>
</header>

<!-- Side Toast Notification -->
<div id="navToast" class="nav-toast">
    <i id="navToastIcon" class="fa-solid fa-circle-exclamation"></i>
    <span id="navToastMessage">Notification Message</span>
</div>

<!-- Main Customer Profile Modal -->
<div class="upm-overlay" id="userProfileModal">
    <div class="upm-card">
        <div class="upm-header">
            <h2 class="upm-title">My Profile</h2>
            <button class="upm-close" onclick="closeUserProfileModal()">&times;</button>
        </div>

        <div class="upm-body">
            <div class="upm-avatar-wrapper">
                <img src="../images/noPFP.jpg" alt="User Avatar" class="upm-avatar-img" id="upmDisplayAvatar">
            </div>
            <button class="upm-btn-photo" onclick="document.getElementById('upmAvatarInput').click()">Change Photo</button>
            <input type="file" id="upmAvatarInput" accept="image/*" style="display:none;">

            <div class="upm-info-box">
                <div class="upm-info-item">
                    <span class="upm-info-label">Full Name</span>
                    <span class="upm-info-value" id="upmInfoName">Guest User</span>
                </div>
                <div class="upm-info-item">
                    <span class="upm-info-label">Email Address</span>
                    <span class="upm-info-value" id="upmInfoEmail">guest@kumamori.com</span>
                </div>
                <div class="upm-info-item">
                    <span class="upm-info-label">Contact Number</span>
                    <span class="upm-info-value" id="upmInfoContact">Not Provided</span>
                </div>
            </div>

            <div class="upm-action-row">
                <button class="upm-btn-primary" onclick="openEditProfileModal()">Edit Profile</button>
                <button class="upm-btn-secondary" onclick="openChangePasswordModal()">Password</button>
            </div>
        </div>
    </div>
</div>

<!-- Edit Profile Sub-Modal -->
<div class="upm-overlay" id="editProfileModal">
    <div class="upm-card">
        <div class="upm-header">
            <h2 class="upm-title">Edit Profile</h2>
            <button class="upm-close" onclick="closeEditProfileModal()">&times;</button>
        </div>

        <form id="editProfileForm">
            <div class="upm-form-group">
                <label class="upm-label" for="editNameInput">Full Name</label>
                <input type="text" id="editNameInput" class="upm-input" required>
            </div>

            <div class="upm-form-group">
                <label class="upm-label" for="editEmailInput">Email Address</label>
                <input type="email" id="editEmailInput" class="upm-input" required>
            </div>

            <div class="upm-form-group">
                <label class="upm-label" for="editContactInput">Contact Number</label>
                <input type="tel" id="editContactInput" class="upm-input" placeholder="e.g. 0912 345 6789">
            </div>

            <button type="submit" class="upm-btn-primary" style="width: 100%; margin-top: 10px;">Save Changes</button>
        </form>
    </div>
</div>

<!-- Change Password Sub-Modal -->
<div class="upm-overlay" id="changePasswordModal">
    <div class="upm-card">
        <div class="upm-header">
            <h2 class="upm-title">Change Password</h2>
            <button class="upm-close" onclick="closeChangePasswordModal()">&times;</button>
        </div>

        <form id="changePasswordForm">
            <div class="upm-form-group">
                <label class="upm-label" for="currentPassInput">Current Password</label>
                <input type="password" id="currentPassInput" class="upm-input" required>
            </div>

            <div class="upm-form-group">
                <label class="upm-label" for="newPassInput">New Password</label>
                <input type="password" id="newPassInput" class="upm-input" required>
            </div>

            <div class="upm-form-group">
                <label class="upm-label" for="confirmPassInput">Confirm New Password</label>
                <input type="password" id="confirmPassInput" class="upm-input" required>
            </div>

            <button type="submit" class="upm-btn-primary" style="width: 100%; margin-top: 10px;">Update Password</button>
        </form>
    </div>
</div>
`);

/* Toast Helper Function */
let navToastTimeout;
function showNavToast(msg, isSuccess = false) {
    const toast = document.getElementById('navToast');
    const toastMsg = document.getElementById('navToastMessage');
    const toastIcon = document.getElementById('navToastIcon');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = msg;
    if (isSuccess) {
        toast.className = 'nav-toast success show';
        toastIcon.className = 'fa-solid fa-circle-check';
    } else {
        toast.className = 'nav-toast error show';
        toastIcon.className = 'fa-solid fa-circle-exclamation';
    }

    clearTimeout(navToastTimeout);
    navToastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}

/* Session & Database Helpers */
function navGetUsers() {
    return JSON.parse(localStorage.getItem('km_users')) || [];
}
function navSaveUsers(users) {
    localStorage.setItem('km_users', JSON.stringify(users));
}
function navGetCurrentUser() {
    return JSON.parse(localStorage.getItem('km_session')) || null;
}
function navSetCurrentUser(user) {
    localStorage.setItem('km_session', JSON.stringify(user));
}

/* User-Scoped Storage Functions (Globally Available across all pages) */
function navGetActiveUserId() {
    const user = navGetCurrentUser();
    return (user && (user.id || user.email)) ? (user.id || user.email) : 'guest';
}

function getUserCart() {
    const userId = navGetActiveUserId();
    return JSON.parse(localStorage.getItem(`km_cart_${userId}`)) || [];
}

function saveUserCart(cartItems) {
    const userId = navGetActiveUserId();
    localStorage.setItem(`km_cart_${userId}`, JSON.stringify(cartItems));
}

function getUserOrders() {
    const userId = navGetActiveUserId();
    return JSON.parse(localStorage.getItem(`km_orders_${userId}`)) || [];
}

function saveUserOrders(orderItems) {
    const userId = navGetActiveUserId();
    localStorage.setItem(`km_orders_${userId}`, JSON.stringify(orderItems));
}

/* Modal Controls */
function openUserProfileModal() {
    document.getElementById('userProfileModal').classList.add('open');
}
function closeUserProfileModal() {
    document.getElementById('userProfileModal').classList.remove('open');
}
function openEditProfileModal() {
    document.getElementById('editNameInput').value = document.getElementById('upmInfoName').textContent;
    document.getElementById('editEmailInput').value = document.getElementById('upmInfoEmail').textContent;
    const currentContact = document.getElementById('upmInfoContact').textContent;
    document.getElementById('editContactInput').value = currentContact === 'Not Provided' ? '' : currentContact;
    document.getElementById('editProfileModal').classList.add('open');
}
function closeEditProfileModal() {
    document.getElementById('editProfileModal').classList.remove('open');
}
function openChangePasswordModal() {
    document.getElementById('changePasswordForm').reset();
    document.getElementById('changePasswordModal').classList.add('open');
}
function closeChangePasswordModal() {
    document.getElementById('changePasswordModal').classList.remove('open');
}

/* Dynamic Event Listeners & Session Sync */
document.addEventListener('DOMContentLoaded', () => {
    const current = window.CURRENT_PAGE || '';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.dataset.page === current) link.classList.add('active');
    });

    const activeSession = navGetCurrentUser();
    if (activeSession) {
        document.getElementById('upmInfoName').textContent = activeSession.name || 'Guest User';
        document.getElementById('upmInfoEmail').textContent = activeSession.email || 'guest@kumamori.com';
        document.getElementById('upmInfoContact').textContent = activeSession.contact || 'Not Provided';
        if (activeSession.avatar) {
            document.getElementById('upmDisplayAvatar').src = activeSession.avatar;
        }
    }

    // Logout
    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('km_session');
            window.location.href = '../publicPages/loginPage.html';
        });
    }

    // Handle Avatar Photo Update
    const avatarInput = document.getElementById('upmAvatarInput');
    if (avatarInput) {
        avatarInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && activeSession) {
                const reader = new FileReader();
                reader.onload = (evt) => {
                    const avatarData = evt.target.result;
                    document.getElementById('upmDisplayAvatar').src = avatarData;

                    const users = navGetUsers();
                    const index = users.findIndex(u => (u.id && u.id === activeSession.id) || u.email === activeSession.email);
                    if (index !== -1) {
                        users[index].avatar = avatarData;
                        navSaveUsers(users);
                    }
                    activeSession.avatar = avatarData;
                    navSetCurrentUser(activeSession);
                    showNavToast("Profile photo updated!", true);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Save Edit Profile
    const editForm = document.getElementById('editProfileForm');
    if (editForm) {
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newName = document.getElementById('editNameInput').value.trim();
            const newEmail = document.getElementById('editEmailInput').value.trim();
            const newContact = document.getElementById('editContactInput').value.trim() || 'Not Provided';

            document.getElementById('upmInfoName').textContent = newName;
            document.getElementById('upmInfoEmail').textContent = newEmail;
            document.getElementById('upmInfoContact').textContent = newContact;

            if (activeSession) {
                const users = navGetUsers();
                const index = users.findIndex(u => (u.id && u.id === activeSession.id) || u.email === activeSession.email);
                if (index !== -1) {
                    users[index].name = newName;
                    users[index].email = newEmail;
                    users[index].contact = newContact;
                    navSaveUsers(users);
                }
                activeSession.name = newName;
                activeSession.email = newEmail;
                activeSession.contact = newContact;
                navSetCurrentUser(activeSession);
            }

            showNavToast("Profile updated successfully!", true);
            closeEditProfileModal();
        });
    }

    // Save Password Update
    const passForm = document.getElementById('changePasswordForm');
    if (passForm) {
        passForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const currentPass = document.getElementById('currentPassInput').value;
            const newPass = document.getElementById('newPassInput').value;
            const confirmPass = document.getElementById('confirmPassInput').value;

            if (activeSession && currentPass !== activeSession.password) {
                showNavToast("Current password is incorrect.", false);
                return;
            }

            if (newPass !== confirmPass) {
                showNavToast("New passwords do not match.", false);
                return;
            }

            if (activeSession) {
                const users = navGetUsers();
                const index = users.findIndex(u => (u.id && u.id === activeSession.id) || u.email === activeSession.email);
                if (index !== -1) {
                    users[index].password = newPass;
                    navSaveUsers(users);
                }
                activeSession.password = newPass;
                navSetCurrentUser(activeSession);
            }

            showNavToast("Password successfully updated!", true);
            closeChangePasswordModal();
        });
    }
});