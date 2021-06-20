<div class="block">

    <section class="col-12">
        <div class="block contentCenterX">
            <div class="col-12 padding-0 marginTop-1 mdMarginTop-4 marginBottom-4">
                <xo-form id="getForm" class="block contentEndX" url="<{ endPoints.citySearch }>" method="GET" type="JSON" @success="action.City.success(this)">
                    <div class="col-12 marginBottom-1 mdMarginBottom-3">
                        <h1 class="header-4 mdHeader-5 textCenter">Recherche Des Villes</h1>
                    </div>
                    <div class="col-6 smCol-12">
                        <div class="col-12">
                            <xo-select @change="action.change(this);action.hide(this, selectField[1])" id="selectField" name="start" class="fullX" placeholder="Date Debut">
                                <xo-icon icon="calendarFrom" width="20" height="20" slot="prefix" style="margin-left: 10px;"></xo-icon>
                                <$ for let i=1; i <= 25; i++ $>
                                    <xo-select-item value="<{i}>">Semaine
                                        <{i}>
                                    </xo-select-item>
                                    <$ end $>
                            </xo-select>
                        </div>
                    </div>
                    <div class="col-6 smCol-12">
                        <div class="col-12">
                            <xo-select @change="action.change(this)" id="selectField" name="end" class="fullX" placeholder="Date Fin">
                                <xo-icon icon="calendarTo" width="20" height="20" slot="prefix" style="margin-left: 10px;"></xo-icon>
                                <$ for let i=1; i <= 25; i++ $>
                                    <xo-select-item value="<{i}>">Semaine
                                        <{i}>
                                    </xo-select-item>
                                    <$ end $>
                            </xo-select>
                        </div>
                    </div>
                    <div class="col-2 smCol-4 mdCol-3">
                        <div class="col-12">
                            <xo-button @click="action.validate('#selectField', getForm);" id="formSubmitButton" class="fullX">
                                <xo-icon icon="magnifier" width="30" height="30" slot="prefix" style="margin-left: 8px;"></xo-icon>
                            </xo-button>
                        </div>
                    </div>
                </xo-form>
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