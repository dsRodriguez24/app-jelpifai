<div class="modal fade" id="modal-add-points" tabindex="-1" style="display: none;" aria-hidden="true" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalCenterTitle"> <i class="fas fa-star"></i> Puntuacion </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="form-points">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12 row" id="modal-points-div-stars">
                            <div class="col-1"></div>
                            <?php
                            for ($i = 1; $i <= 5; $i++) {  ?>
                                <div class="col-2" onclick="show_points_stars(<?= $i ?>)">
                                    <h1 class="text-primary" onclick="show_points_stars(<?= $i ?>)"> <i class="fa-regular fa-star"></i> </h1>
                                </div>
                            <?php
                            }
                            ?>
                            <div class="col-1"></div>
                        </div>


                        <div class="col-12">
                            <label for="titulo" class="form-label">Comentario</label>
                            <textarea type="text" name="comentario_voluntario" required class="form-control" placeholder="Ingrese un comentario"></textarea>
                        </div>
                    </div>

                    <input type="hidden" id="solicitud_id" value="0">
                    <input type="hidden" name="calificacion_voluntario" value="0">

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="submit" class="btn btn-primary"> <i class="fas fa-bookmark"></i> Crear</button>
                </div>
            </form>
        </div>
    </div>
</div>