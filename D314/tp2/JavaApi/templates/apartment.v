<div class="block">

    <section class="col-12">
        <div class="block contentCenterX">
            <div class="col-12 padding-0 marginTop-1 mdMarginTop-4 marginBottom-4">
                <div class="block contentEndX">
                    <div class="col-12 marginBottom-1 mdMarginBottom-3">
                        <h1 class="header-4 mdHeader-5 textCenter">Recherche Des Appartements</h1>
                    </div>
                    <div id="searchTypeDiv" class="col-4 smCol-12">
                        <div class="col-12">
                            <xo-select @change="action.Apartment.changeFields(this)" id="searchTypeSelectField" class="fullX" placeholder="Type Recherche">
                                <xo-icon icon="cogs" width="20" height="20" slot="prefix" style="margin-left: 10px"></xo-icon>
                                <xo-select-item value="0" selected>Reference</xo-select-item>
                                <xo-select-item value="1">Date et Ville</xo-select-item>
                            </xo-select>
                        </div>
                    </div>
                    <div id="searchFormDiv" class="col-8 smCol-12 padding-0">
                       <xo-form  id="getForm" class="block" method="GET" type="JSON" @success="action.Apartment.success(this)">
                            <div class="col-12">
                                <div class="col-12">
                                    <xo-textbox @input="getForm.url = '<{ endPoints.apartment }>' + this.value;" id="selectField" name="id" class="fullX" placeholder="Reference">
                                        <xo-icon icon="hashTag" width="20" height="20" slot="prefix" style="margin-left: 10px"></xo-icon>
                                    </xo-textbox>
                                </div>
                            </div>
                        </xo-form>
                    </div>
                    <div class="col-2 smCol-4 mdCol-3">
                        <div class="col-12">
                            <xo-button @click="action.validate('#selectField', getForm);" id="formSubmitButton" class="fullX">
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
                    <xo-badge class="fullX" loader></xo-badge>
                </div>
            </div>
            <div class="col-3 lgCol-4 mdCol-6 smCol-12">
                <div class="col-12">
                    <xo-badge class="fullX" loader></xo-badge>
                </div>
            </div>
            <div class="col-3 lgCol-4 mdCol-6 smCol-12">
                <div class="col-12">
                    <xo-badge class="fullX" loader></xo-badge>
                </div>
            </div>
            <div class="col-3 lgCol-4 mdCol-6 smCol-12">
                <div class="col-12">
                    <xo-badge class="fullX" loader></xo-badge>
                </div>
            </div>
            <div class="col-3 lgCol-4 mdCol-6 smCol-12">
                <div class="col-12">
                    <xo-badge class="fullX" loader></xo-badge>
                </div>
            </div>
            <div class="col-3 lgCol-4 mdCol-6 smCol-12">
                <div class="col-12">
                    <xo-badge class="fullX" loader></xo-badge>
                </div>
            </div>
            <div class="col-3 lgCol-4 mdCol-6 smCol-12">
                <div class="col-12">
                    <xo-badge class="fullX" loader></xo-badge>
                </div>
            </div>
            <div class="col-3 lgCol-4 mdCol-6 smCol-12">
                <div class="col-12">
                    <xo-badge class="fullX" loader></xo-badge>
                </div>
            </div>
        </div>
    </section>

</div>