import SPA from "./src/scripts/XO.Spa.js"
import XO from "./src/scripts/XO.js";

import Home from "./views/home.js"
import City from "./views/city.js"
import Apartment from "./views/apartment.js"
import Booking from "./views/booking.js"
import Weather from "./views/weather.js"
import NotFound from "./views/notFound.js"
import { html } from "./src/scripts/XO.Engine.js";

window.spa = new SPA();
window.XO = XO;

spa.target = document.querySelector("xo-app");

spa.routes = [{
        path: "/",
        view: Home
    }, {
        path: "/city",
        view: City,
        callback: async() => {
            await require({ name: "xo-select", path: "XO.Select" });
            await require({ name: "xo-select-item", path: "XO.SelectItem" });
            await require({ name: "xo-button", path: "XO.Button" });
            await require({ name: "xo-badge", path: "XO.Badge" });
            await require({ name: "xo-form", path: "XO.Form" });
        }
    }, {
        path: "/apartment",
        view: Apartment,
        callback: async() => {
            await require({ name: "xo-textbox", path: "XO.TextBox" });
            await require({ name: "xo-select", path: "XO.Select" });
            await require({ name: "xo-select-item", path: "XO.SelectItem" });
            await require({ name: "xo-button", path: "XO.Button" });
            await require({ name: "xo-badge", path: "XO.Badge" });
            await require({ name: "xo-form", path: "XO.Form" });
        }
    },
    {
        path: "/booking",
        view: Booking,
        callback: async() => {
            await require({ name: "xo-select", path: "XO.Select" });
            await require({ name: "xo-select-item", path: "XO.SelectItem" });
            await require({ name: "xo-button", path: "XO.Button" });
            await require({ name: "xo-form", path: "XO.Form" });
            await require({ name: "xo-alert", path: "XO.Alert" });
            await require({ name: "xo-badge", path: "XO.Badge" });
            await action.Booking.setBookings();
        }
    },
    {
        path: "/weather",
        view: Weather,
        callback: async() => {
            await require({ name: "xo-textbox", path: "XO.TextBox" });
            await require({ name: "xo-select", path: "XO.Select" });
            await require({ name: "xo-select-item", path: "XO.SelectItem" });
            await require({ name: "xo-button", path: "XO.Button" });
            await require({ name: "xo-form", path: "XO.Form" });
        }
    }
];

spa.notFound = {
    path: "/404/",
    view: NotFound,
};

document.addEventListener("DOMContentLoaded", async() => {
    await require({ name: "xo-icon", path: "XO.Icon" });
    await require({ name: "xo-navbar", path: "XO.NavBar" });
    await require({ name: "xo-navbar-item", path: "XO.NavBarItem" });


    window.endPoints = {
        city: "http://localhost:8080/Locapart/api/cities",
        apartment: "http://localhost:8080/Locapart/api/apartments/",
        booking: "http://localhost:8080/Locapart/api/bookings",
        citySearch: "http://localhost:8080/Locapart/api/cities/search",
        apartmentSearch: "http://localhost:8080/Locapart/api/apartments/search",
        apartmentFilter: "http://localhost:8080/Locapart/api/apartments/filter",
        OWM: {
            base: "https://api.openweathermap.org/data/2.5/",
            key: "ea15e5963aaf3b17c1954a0f6cc85a21",
        }
    }

    window.action = {
        list: (el) => {
            var LIST;
            if (typeof el === "string") LIST = Array.from(document.querySelectorAll(el));
            else if (el instanceof HTMLElement) LIST = [el];
            else LIST = Array.from(el);
            return function(fn, cb) {
                if (typeof fn === "function" && typeof cb === "undefined")
                    LIST.forEach((item, index) => fn(item, index));
                else if (typeof fn === "string" && typeof cb === "function")
                    LIST.forEach((item, index) => {
                        item.addEventListener(fn, event => {
                            cb(item, event, index)
                        })
                    });
            }
        },
        change: (self) => {
            if (self.value) self.error = '';
        },
        hide: (self, target) => {
            action.list(target.querySelectorAll("xo-select-item"))(item => item.removeAttribute("hide"));
            action.list(target.querySelectorAll("xo-select-item"))(item => {
                if (parseInt(item.value) < parseInt(self.value)) {
                    item.setAttribute("hide", "");
                    target.clear();
                }
            });
        },
        foo: (self, target) => {
            action.list(target.querySelectorAll("xo-select-item"))(item => {
                if (parseInt(item.value) < parseInt(self.value)) {
                    item.setAttribute("hide", "");
                }
            });
        },
        validate: (selector, form, t) => {
            var data = [];
            action.list(selector)(item => {
                if (item.value) {
                    item.error = '';
                } else {
                    item.error = 'Required Field.';
                    data.push(false);
                }
            })
            if (data.length === 0) {
                cardDisplayDiv.innerHTML = action.badge("<{void}>", "Loading....");
                form.submit();
            }
            if (t) {
                form.submit();
                return;
            }
        },
        badge: (n, txt) => {
            switch (n) {
                case "<{void}>":
                    return `<div class="col-12">
                        <div class="col-12 marginY-2">
                            <h1 class="subHeader-4 textCenter">${txt}</h1>
                        </div>
                    </div>`;
                case "<{plain}>":
                    return `<div class="col-12">
                        <div class="col-12" style="margin: auto;">
                            <h1 class="header-3 textCenter marginBottom-1">${txt.split("|")[0]}</h1>
                            <h1 class="header-6">Description:</h1>
                            <p class="size-18 marginTop-4">${txt.split("|")[1]}</p>
                        </div>
                    </div>`;
                default:
                    return `<div class="col-3 lgCol-4 mdCol-6 smCol-12">
                        <div class="col-12">
                            <xo-badge class="fullX">${n}</xo-badge>
                        </div>
                    </div>`;
            }
        },
        item: (id, txt) => {
            var ELEMENT = `<xo-select-item value="${id}">${txt}</xo-select-item>`;
            return ELEMENT;
        },
        row: (id, start, end, title) => {
            return `<tr>
                        <td>Semaine ${start}</td>
                        <td>Semaine ${end}</td>
                        <td>${title}</td>
                        <td>
                            <xo-form url="${endPoints.booking}/${id}" method="delete" type="json" @success="action.Booking.success(this, 'supprimé avec succès.');" @error="action.Booking.error(this);">
                                <xo-icon @click="this.parentElement.submit()" icon="trash" width="20" height="20" color="#fff"></xo-icon>
                            </xo-form>
                        </td>
                    </tr>`;
        },
        card: (cloud, wind, humidity, temp, min, max, city, desc, icon) => {
            return `
                <div class="col-3 lgCol-4 mdCol-6 smCol-12">
                    <div class="col-12">
                        <div style="background-image: url(assets/back${Math.floor(Math.random() * 10)}.jpg)" weather>
                            <section header>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                        <path d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4z" class=""></path>
                                    </svg>
                                    ${Math.round(cloud)} %
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path d="M156.7 256H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h142.2c15.9 0 30.8 10.9 33.4 26.6 3.3 20-12.1 37.4-31.6 37.4-14.1 0-26.1-9.2-30.4-21.9-2.1-6.3-8.6-10.1-15.2-10.1H81.6c-9.8 0-17.7 8.8-15.9 18.4 8.6 44.1 47.6 77.6 94.2 77.6 57.1 0 102.7-50.1 95.2-108.6C249 291 205.4 256 156.7 256zM16 224h336c59.7 0 106.8-54.8 93.8-116.7-7.6-36.2-36.9-65.5-73.1-73.1-55.4-11.6-105.1 24.9-114.9 75.5-1.9 9.6 6.1 18.3 15.8 18.3h32.8c6.7 0 13.1-3.8 15.2-10.1C325.9 105.2 337.9 96 352 96c19.4 0 34.9 17.4 31.6 37.4-2.6 15.7-17.4 26.6-33.4 26.6H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16zm384 32H243.7c19.3 16.6 33.2 38.8 39.8 64H400c26.5 0 48 21.5 48 48s-21.5 48-48 48c-17.9 0-33.3-9.9-41.6-24.4-2.9-5-8.7-7.6-14.5-7.6h-33.8c-10.9 0-19 10.8-15.3 21.1 17.8 50.6 70.5 84.8 129.4 72.3 41.2-8.7 75.1-41.6 84.7-82.7C526 321.5 470.5 256 400 256z"></path>
                                    </svg>
                                    ${Math.round(wind)} m/s
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                                        <path d="M205.22 22.09c-7.94-28.78-49.44-30.12-58.44 0C100.01 179.85 0 222.72 0 333.91 0 432.35 78.72 512 176 512s176-79.65 176-178.09c0-111.75-99.79-153.34-146.78-311.82zM176 448c-61.75 0-112-50.25-112-112 0-8.84 7.16-16 16-16s16 7.16 16 16c0 44.11 35.89 80 80 80 8.84 0 16 7.16 16 16s-7.16 16-16 16z"></path>
                                    </svg>
                                    ${Math.round(humidity)} %
                                </div>
                            </section>
                            <section main>
                                <div temp>${Math.round(temp)}</div>
                                <div data>
                                    <div unit>°C</div>
                                    <div minmax>${Math.round(min)}°</div>
                                    <div minmax>${Math.round(max)}°</div>
                                </div>
                            </section>
                            <section city>${city}</section>
                            <section desc>${desc}</section>
                            <section icon>
                                <img src="${icon}" />
                            </section>
                        </div>
                    </div>
                </div>
            `;
        },
        filter: (self) => {
            switch (self.value) {
                case "0":
                    searchTypeDiv.className = "col-4 smCol-12";
                    searchFormDiv.className = "col-8 smCol-12 padding-0";
                    searchFormDiv.innerHTML = `
                        <div class="block">
                            <div class="col-12">
                                <div class="col-12">
                                    <xo-textbox id="selectField" name="id" class="fullX" placeholder="Nom">
                                        <xo-icon icon="map" width="20" height="20" slot="prefix" style="margin-left: 10px"></xo-icon>
                                    </xo-textbox>
                                </div>
                            </div>
                        </div>
                    `;
                    break;
                case "1":
                    searchTypeDiv.className = "col-4 smCol-12";
                    searchFormDiv.className = "col-8 smCol-12 padding-0";
                    searchFormDiv.innerHTML = `
                        <div class="block">
                            <div class="col-12">
                                <div class="col-12">
                                    <xo-textbox id="selectField" name="id" class="fullX" placeholder="Zip Code">
                                        <xo-icon icon="hashTag" width="20" height="20" slot="prefix" style="margin-left: 10px"></xo-icon>
                                    </xo-textbox>
                                </div>
                            </div>
                        </div>
                    `;
                    break;
                case "2":
                    searchTypeDiv.className = "col-4 smCol-12";
                    searchFormDiv.className = "col-8 smCol-12 padding-0";
                    searchFormDiv.innerHTML = `
                        <div class="block">
                            <div class="col-6 mdCol-12">
                                <div class="col-12">
                                    <xo-textbox id="selectField" name="id" class="fullX" placeholder="Latitude">
                                        <xo-icon icon="latitude" width="20" height="20" slot="prefix" style="margin-left: 10px"></xo-icon>
                                    </xo-textbox>
                                </div>
                            </div>
                            <div class="col-6 mdCol-12">
                                <div class="col-12">
                                    <xo-textbox id="selectField" name="id" class="fullX" placeholder="Longitude">
                                        <xo-icon icon="longitude" width="20" height="20" slot="prefix" style="margin-left: 10px"></xo-icon>
                                    </xo-textbox>
                                </div>
                            </div>
                        </div>
                    `;
                    break;
                case "3":
                    searchTypeDiv.className = "col-3 smCol-12";
                    searchFormDiv.className = "col-9 smCol-12 padding-0";
                    searchFormDiv.innerHTML = `
                        <div class="block">
                            <div class="col-4 mdCol-12">
                                <div class="col-12">
                                    <xo-textbox id="selectField" name="id" class="fullX" placeholder="Latitude">
                                        <xo-icon icon="latitude" width="20" height="20" slot="prefix" style="margin-left: 10px"></xo-icon>
                                    </xo-textbox>
                                </div>
                            </div>
                            <div class="col-4 mdCol-12">
                                <div class="col-12">
                                    <xo-textbox id="selectField" name="id" class="fullX" placeholder="Longitude">
                                        <xo-icon icon="longitude" width="20" height="20" slot="prefix" style="margin-left: 10px"></xo-icon>
                                    </xo-textbox>
                                </div>
                            </div>
                            <div class="col-4 mdCol-12">
                                <div class="col-12">
                                    <xo-textbox id="selectField" name="id" class="fullX" placeholder="Nombre Du Ville">
                                        <xo-icon icon="calculator" width="20" height="20" slot="prefix" style="margin-left: 10px"></xo-icon>
                                    </xo-textbox>
                                </div>
                            </div>
                        </div>
                    `;
                    break;
            }
        },
        City: class {
            static async getCities() {
                var [req, res] = await XO.fetch({ url: endPoints.city, type: "json" });
                return res;
            }
            static success(self) {
                cardDisplayDiv.innerHTML = "";
                if (event.detail.result.length === 0) {
                    cardDisplayDiv.innerHTML = action.badge("<{void}>", "No Data Found");
                } else {
                    action.list(event.detail.result)(item => {
                        cardDisplayDiv.innerHTML += action.badge(item.slug);
                    });
                }
            }
        },
        Apartment: class {
            static async getApartments(s, e) {
                var [req, res] = await XO.fetch({ url: endPoints.apartmentFilter, type: "json", data: { start: s, end: e } });
                return res;
            }
            static async setCities() {
                var cities = await action.City.getCities();
                action.list(cities)(item => {
                    selectField[2].innerHTML += action.item(item.id, item.slug);
                });
            }
            static success(self) {
                event.preventDefault();
                cardDisplayDiv.innerHTML = "";
                if (Array.isArray(event.detail.result)) {
                    if (event.detail.result.length === 0) {
                        cardDisplayDiv.innerHTML = action.badge("<{void}>", "No Data Found");
                    } else {
                        if (searchTypeSelectField.value === "1")
                            action.list(event.detail.result)(item => {
                                cardDisplayDiv.innerHTML += action.badge(item.title);
                            });
                    }
                } else {
                    cardDisplayDiv.innerHTML = action.badge("<{plain}>", event.detail.result.title + "|" + event.detail.result.description);
                }
            }
            static async changeFields(self) {
                if (self.value === "0") {
                    getForm.innerHTML = `<div class="col-12">
                                            <div class="col-12">
                                                <xo-textbox @input="getForm.url = '${endPoints.apartment}' + this.value;" id="selectField" name="id" class="fullX" placeholder="Reference">
                                                    <xo-icon icon="hashTag" width="20" height="20" slot="prefix" style="margin-left: 10px"></xo-icon>
                                                </xo-textbox>
                                            </div>
                                        </div>`;
                    searchTypeDiv.classList.remove("col-3");
                    searchFormDiv.classList.remove("col-9");
                    searchTypeDiv.classList.add("col-4");
                    searchFormDiv.classList.add("col-8");
                } else {
                    getForm.url = endPoints.apartmentSearch;
                    getForm.innerHTML = await html()
                    `<div class="col-4 smCol-12">
                                            <div class="col-12">
                                                <xo-select @change="action.change(this);action.hide(this, selectField[1])" id="selectField" name="start" class="fullX" placeholder="Date Debut">
                                                    <xo-icon icon="calendarFrom" width="20" height="20" slot="prefix" style="margin-left: 10px"></xo-icon>
                                                    <$ for let i=1; i <= 25; i++ $>
                                                        <xo-select-item value="<{i}>">Semaine <{i}></xo-select-item>
                                                    <$ end $>
                                                </xo-select>
                                            </div>
                                        </div>
                                        <div class="col-4 smCol-12">
                                            <div class="col-12">
                                                <xo-select @change="action.change(this)" id="selectField" name="end" class="fullX" placeholder="Date Fin">
                                                    <xo-icon icon="calendarTo" width="20" height="20" slot="prefix" style="margin-left: 10px"></xo-icon>
                                                    <$ for let i=1; i <= 25; i++ $>
                                                        <xo-select-item value="<{i}>">Semaine <{i}></xo-select-item>
                                                    <$ end $>
                                                </xo-select>
                                            </div>
                                        </div>
                                        <div class="col-4 smCol-12">
                                            <div class="col-12">
                                                <xo-select @load="action.Apartment.setCities()" id="selectField" name="city" class="fullX" placeholder="Ville">
                                                    <xo-icon icon="mapMarker" width="20" height="20" slot="prefix" style="margin-left: 10px"></xo-icon>
                                                </xo-select>
                                            </div>
                                        </div>`;
                    searchTypeDiv.classList.remove("col-4");
                    searchFormDiv.classList.remove("col-8");
                    searchTypeDiv.classList.add("col-3");
                    searchFormDiv.classList.add("col-9");
                }
            }
        },
        Booking: class {
            static async setApartments(s, e) {
                action.list(".apartmentField xo-select-item")(item => item.remove())
                if (s && e) {
                    var apartments = await action.Apartment.getApartments(s, e);
                    action.list(apartments)(item => {
                        selectField[2].innerHTML += action.item(item.id, item.title);
                    });
                }
            }
            static async getBookings() {
                var [req, res] = await XO.fetch({ url: endPoints.booking });
                return res;
            }
            static async setBookings() {
                var bookings = await action.Booking.getBookings();
                cardDisplayDiv.innerHTML = "";
                action.list(bookings)(item => {
                    cardDisplayDiv.innerHTML += action.row(item.id, item.strat, item.end, item.apartmentTitle)
                });
            }
            static success(self, msg) {
                if (event.detail.result > 0) {
                    document.body.innerHTML += `<xo-alert @load="setTimeout(()=>{this.remove()}, 5000)" class="col-5 mdCol-10 padding-0 margin-6 positionAbsolute positionBottomRight" theme="forest">${msg}}</xo-alert>`;
                    action.Booking.setBookings();
                } else {
                    action.Booking.error(self);
                }
            }
            static error(self) {
                document.body.innerHTML += `<xo-alert @load="setTimeout(()=>{this.remove()}, 5000)" class="col-5 mdCol-10 padding-0 margin-6 positionAbsolute positionBottomRight" theme="fire">une erreur s'est produite.</xo-alert>`;
            }
        },
        Weather: class {
            static async getWeather(data) {
                data.appid = endPoints.OWM.key;
                data.units = "metric";
                data.lang = "fr";
                let [req, res] = await XO.fetch({ url: endPoints.OWM.base + "weather", data: data, type: "json" }),
                    obj = {
                        temp: {
                            value: res.main["temp"],
                            min: res.main["temp_min"],
                            max: res.main["temp_max"]
                        },
                        wind: {
                            speed: res.wind["speed"],
                            degree: res.wind["deg"]
                        },
                        city: res["name"] + ", " + res.sys["country"],
                        clouds: res.clouds["all"],
                        humidity: res.main["humidity"],
                        pressure: res.main["pressure"],
                        description: res.weather[0]["description"],
                        icon: "http://openweathermap.org/img/w/" + res.weather[0]["icon"] + ".png"
                    };
                return [obj];
            }
            static async getWeatherList(data) {
                data.appid = endPoints.OWM.key;
                data.units = "metric";
                data.lang = "fr";
                let [req, res] = await XO.fetch({ url: endPoints.OWM.base + "find", data: data, type: "json" }),
                    obj = [];
                action.list(res.list)(i => {
                    obj.push({
                        temp: {
                            value: i.main["temp"],
                            min: i.main["temp_min"],
                            max: i.main["temp_max"]
                        },
                        wind: {
                            speed: i.wind["speed"],
                            degree: i.wind["deg"]
                        },
                        city: i["name"] + ", " + i.sys["country"],
                        clouds: i.clouds["all"],
                        humidity: i.main["humidity"],
                        pressure: i.main["pressure"],
                        description: i.weather[0]["description"],
                        icon: "http://openweathermap.org/img/w/" + i.weather[0]["icon"] + ".png"
                    })
                })
                return obj;
            }
            static async success(selector) {
                var data = [],
                    res;
                action.list(selector)(item => {
                    if (item.value) {
                        item.error = '';
                    } else {
                        item.error = 'Required Field.';
                        data.push(false);
                    }
                })
                if (data.length === 0) {
                    cardDisplayDiv.innerHTML = action.badge("<{void}>", "Loading....");
                    switch (searchTypeSelectField.value) {
                        case "0":
                            res = await action.Weather.getWeather({ q: selectField.value });
                            break;
                        case "1":
                            res = await action.Weather.getWeather({ zip: selectField.value });
                            break;
                        case "2":
                            res = await action.Weather.getWeather({ lat: selectField[0].value, lon: selectField[1].value });
                            break;
                        case "3":
                            res = await action.Weather.getWeatherList({ lat: selectField[0].value, lon: selectField[1].value, cnt: selectField[2].value });
                            break;
                    }
                }
                cardDisplayDiv.innerHTML = "";
                action.list(res)(item => {
                    cardDisplayDiv.innerHTML += action.card(item.clouds, item.wind.speed, item.humidity, item.temp.value, item.temp.min, item.temp.max, item.city, item.description, item.icon)
                });
            }
        }
    }

    spa.init();
    spa.run();
});