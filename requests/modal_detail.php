<div class="modal fade" id="modal-detail-request" tabindex="-1" style="display: none;" aria-hidden="true" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalCenterTitle"> <i class="fas fa-list"></i> Detalle de solicitud</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">

                    <!-- CARROUSEL -->
                    <div class="col-xl-6 col-lg-6 col-12">
                        <div id="carouselDetailRequest" class="carousel carousel-dark slide carousel-fade" data-bs-ride="carousel">
                            <div class="carousel-indicators"></div>
                            <div class="carousel-inner"></div>
                            <a class="carousel-control-prev" href="#carouselDetailRequest" role="button" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden"> < </span>
                            </a>
                            <a class="carousel-control-next" href="#carouselDetailRequest" role="button" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden"> > </span>
                            </a>
                        </div>
                    </div>
                    <!-- CARROUSEL - END -->
                    
                    <div class="col-xl-6 col-lg-6 col-12 mt-3" id="detail-request"></div>

                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary" id="btn-modal-take-request"> <i class="fas fa-check"></i> Tomar solicitud</button>
            </div>
        </div>
    </div>
</div>