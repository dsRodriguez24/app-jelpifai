<div class="modal fade" id="modal-update-request" tabindex="-1" style="display: none;" aria-hidden="true" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalCenterTitle"> <i class="fas fa-pen"></i> Actualizar solicitud</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="form-update-request">
            <div class="modal-body">
                <div class="row">
                    <div class="col-12">
                        <label for="titulo" class="form-label">Titulo</label>
                        <input type="text" name="titulo" required class="form-control" placeholder="Ingrese un titulo">
                    </div>

                    <div class="col-12">
                        <label for="descripcion" class="form-label">Descripcion</label>
                        <textarea name="descripcion" required class="form-control" placeholder="Ingresa una descripcion..." style="height: 100px"></textarea>
                    </div>
                    
                    <div class="col-lg-4 col-xl-4 col-12">
                        <label for="prioridad_solicitud"  class="form-label">Prioridad</label>
                        <select name="prioridad_solicitud" required class="form-select">
                            <?php 
                            $prioridad = [ 
                                "1" => "Urgente", 
                                "2" => "Proximas 24 horas", 
                                "3" => "Esta semana"
                            ];
                            foreach ($prioridad as $key => $value) {
                                echo '<option value="'.$key.'">'.$value.'</option>';
                            }
                            ?>
                        </select>
                    </div>
                    
                    <div class="col-lg-4 col-xl-4 col-12">
                        <label for="metodo_remuneracion_id" class="form-label">Tipo de remuneración</label>
                        <select name="metodo_remuneracion_id" onchange="handler_change_tipo_rem_update(this.value)" required class="form-select">
                            <?php
                            $tipos_remuneracion = [ 
                                "1" => "Puntos", 
                                "2" => "Favor", 
                            ];

                            foreach ($tipos_remuneracion as $key => $value) {
                                echo '<option value="'.$key.'">'.$value.'</option>';
                            }
                            ?>
                        </select>
                    </div>
                    
                    <div class="col-lg-4 col-xl-4 col-12">
                        <label for="maximo_dias_entrega"  class="form-label">Max. dias entrega</label>
                        <input name="maximo_dias_entrega" min="1" value="1" class="form-control">
                    </div>
                    
                    <div class="col-12" id="div-puntos-ofrecidos">
                        <label for="puntos_ofrecidos" class="form-label">Puntos ofrecidos <b id="number-points-update">[0]</b> </label>
                        <input type="range" min="0" max="100" value="0" step="5" required name="puntos_ofrecidos" onchange="document.getElementById('number-points-update').innerHTML = `[${this.value}]` " style="width: 100%;">
                    </div>

                    <div class="col-md-12" id="previously-uploaded-files"></div>

                    <div class="col-12">
                        <label class="form-label">Archivos / Fotos</label>
                        <div class="d-flex gap-2 flex-wrap" id="preview-container-update"></div>

                        <div class="mt-2 d-flex gap-2">
                            <!-- Botón para seleccionar archivos -->
                            <input type="file" id="file-input-update" accept="image/*,application/pdf,.doc,.docx" multiple hidden>
                            
                            <!-- <button type="button" class="btn btn-outline-primary btn-sm" onclick="document.getElementById('file-input').click()">
                                <i class="fas fa-upload"></i> Subir archivos
                            </button> -->

                            <!-- Botón para tomar fotos -->
                            <button type="button" class="btn btn-outline-secondary btn-sm" onclick="take_photo_update()">
                                <i class="fas fa-camera"></i> Tomar foto
                            </button>
                        </div>
                    </div>

                    <input type="hidden" id="request_id" value="0">

                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="submit" class="btn btn-primary"> <i class="fas fa-bookmark"></i> Actualizar</button>
            </div>
            </form> 
        </div>
    </div>
</div>