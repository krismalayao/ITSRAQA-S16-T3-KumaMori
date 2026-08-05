document.write(`
<style>
.site-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f9e2e6;
    padding: 30px 80px;
    font-family: 'Fredoka', sans-serif;
}
.footer-logo img {
    height: 50px;
    transition: transform .2s;
}
.footer-logo img:hover {
    transform: rotate(-6deg) scale(1.05);
}
.footer-social {
    text-align: left;
}
.footer-social p {
    margin-bottom: 8px;
    font-weight: 600;
    color: #5c3214;
}
.social-icons {
    display: flex;
    gap: 18px;
    font-size: 1.4rem;
}
.social-icons a {
    color: #5c3214;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: #fff;
    transition: background .2s, color .2s, transform .2s;
}
.social-icons a:hover {
    background: #5c3214;
    color: #f9e2e6;
    transform: translateY(-3px);
}

/* Footer Responsive Media Query */
@media (max-width: 768px) {
    .site-footer {
        flex-direction: column;
        text-align: center;
        padding: 30px 20px;
        gap: 20px;
    }
    .footer-social {
        text-align: center;
    }
    .social-icons {
        justify-content: center;
    }
}
</style>

<footer class="site-footer">
    <div class="footer-logo">
        <img src="../images/publicPages.png" alt="PLACEHOLDER: Kuma Mori footer logo">
    </div>

    <div class="footer-social">
        <p>Social Media</p>
        <div class="social-icons">
            <a href="https://www.facebook.com/profile.php?id=61579283878324" target="_blank" aria-label="Facebook">
                <i class="fa-brands fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/kumamori.ph/" target="_blank" aria-label="Instagram">
                <i class="fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.tiktok.com/@kumamori.ph?is_from_webapp=1&sender_device=pc" target="_blank" aria-label="TikTok">
                <i class="fa-brands fa-tiktok"></i>
            </a>
        </div>
    </div>
</footer>
`);