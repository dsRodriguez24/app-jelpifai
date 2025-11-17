<div class="offcanvas offcanvas-end" data-bs-scroll="true" tabindex="-1" id="offcanvasChat">
    <div class="offcanvas-header border-bottom">
        <h5 class="offcanvas-title"><i class="fas fa-comments"></i> Chat</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
    </div>

    <div class="offcanvas-body p-0 d-flex flex-column">

        <!-- Historial -->
        <div class="chat-history flex-grow-1 p-3 overflow-auto">
            <div id="spinner-loader-chat"></div>

            <ul class="list-unstyled">

                <!-- Mensaje enviado -->
                <!-- <li class="chat-message chat-right mb-3">
                    <div class="msg-container">
                        <p class="msg-text">How can we help? We're here for you! 😄</p>
                        <small class="msg-time">10:00 AM</small>
                    </div>
                    <img src="../assets/img/avatars/user.png" class="chat-avatar">
                </li> -->

                <!-- Mensaje recibido -->
                <!-- <li class="chat-message chat-left mb-3">
                    <img src="../assets/img/avatars/user.png" class="chat-avatar">
                    <div class="msg-container">
                        <p class="msg-text">Hey John, I am looking for the best admin template.</p>
                        <p class="msg-text">Could you please help me to find it out? 🤔</p>
                        <p class="msg-text">It should be Bootstrap 5 compatible.</p>
                        <small class="msg-time">10:02 AM</small>
                    </div>
                </li> -->

            </ul>

        </div>

        <!-- Input -->
        <div class="chat-input border-top p-3">
            <form class="d-flex align-items-center" id="form-send-message">
                <input type="hidden" name="solicitud_id" id="solicitud_id">
                <input class="form-control rounded-pill me-3" name="mensaje" placeholder="Type your message...">
                <button class="btn btn-primary rounded-circle">
                    <i class="bx bx-paper-plane"></i>
                </button>
            </form>
        </div>

    </div>
</div>
<link rel="stylesheet" href="<?= $BASE_URL_FRONT ?>requests/css/chat.css">