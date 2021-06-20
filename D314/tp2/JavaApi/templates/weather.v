<div class="block">

    <section class="col-12">
        <div class="block contentCenterX">
            <div class="col-12 padding-0 marginTop-1 mdMarginTop-4 marginBottom-4">
                <div class="block contentEndX">
                    <div class="col-12 marginBottom-1 mdMarginBottom-3">
                        <h1 class="header-4 mdHeader-5 textCenter">Meteo Du Villes</h1>
                    </div>
                    <div id="searchTypeDiv" class="col-4 smCol-12">
                        <div class="col-12">
                            <xo-select @change="action.filter(this)" id="searchTypeSelectField" class="fullX" placeholder="Type Recherche">
                                <xo-icon icon="cogs" width="20" height="20" slot="prefix" style="margin-left: 10px"></xo-icon>
                                <xo-select-item value="0" selected>Nom Du Ville</xo-select-item>
                                <xo-select-item value="1">Zip Code</xo-select-item>
                                <xo-select-item value="2">Cordinate</xo-select-item>
                                <xo-select-item value="3">Region</xo-select-item>
                            </xo-select>
                        </div>
                    </div>
                    <div id="searchFormDiv" class="col-8 smCol-12 padding-0">
                        <div class="block">
                            <div class="col-12">
                                <div class="col-12">
                                    <xo-textbox id="selectField" name="id" class="fullX" placeholder="Nom">
                                        <xo-icon icon="map" width="20" height="20" slot="prefix" style="margin-left: 10px"></xo-icon>
                                    </xo-textbox>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-2 smCol-4 mdCol-3">
                        <div class="col-12">
                            <xo-button @click="action.Weather.success('#selectField')" id="formSubmitButton" class="fullX">
                                <xo-icon icon="magnifier" width="30" height="30" slot="prefix" style="margin-left: 8px"></xo-icon>
                            </xo-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section class="col-12">
        <div id="cardDisplayDiv" class="block">
           <div class="col-3 lgCol-4 mdCol-6 smCol-12">
                <div class="col-12">
                    <div style="height: 400px" holderRow></div>
                </div>
            </div>
            <div class="col-3 lgCol-4 mdCol-6 smCol-12">
                <div class="col-12">
                    <div style="height: 400px" holderRow></div>
                </div>
            </div>
            <div class="col-3 lgCol-4 mdCol-6 smCol-12">
                <div class="col-12">
                    <div style="height: 400px" holderRow></div>
                </div>
            </div>
            <div class="col-3 lgCol-4 mdCol-6 smCol-12">
                <div class="col-12">
                    <div style="height: 400px" holderRow></div>
                </div>
            </div>
        </div>
    </section>

</div>