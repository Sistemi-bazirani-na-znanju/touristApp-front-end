import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Company } from '../../company/model/company.model';
import { CompanyService } from '../../company/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as L from 'leaflet';
import { Coordinates } from '../../infrastructure/rest/model/coordinates.model';
import { Stomp } from '@stomp/stompjs';
import SockJS, * as WebSocketJS from 'sockjs-client';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'pd-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapDeliveryComponent implements OnInit, AfterViewInit {
  private map!: L.Map;

  private serverUrl = 'http://localhost:8080/ws';
  private stompClient: any;

  isLoaded: boolean = false;
  isCustomSocketOpened: boolean = false;

  startCoordinates!: Coordinates;
  middleCoordinates!: Coordinates;
  middleCoordinates1!: Coordinates;
  middleCoordinates2!: Coordinates;
  middleCoordinates3!: Coordinates;
  middleCoordinates4!: Coordinates;
  middleCoordinates5!: Coordinates;
  middleCoordinates6!: Coordinates;
  middleCoordinates7!: Coordinates;
  middleCoordinates8!: Coordinates;
  middleCoordinates9!: Coordinates;
  endCoordinates!: Coordinates;
  deliveryCoordinates!: Coordinates;
  coordinatesList: Coordinates[] = [];

  deliveryId: number = -1;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.coordinatesList.push(this.startCoordinates);
    // this.coordinatesList.push(this.endCoordinates);
    this.initializeWebSocketConnection();
    this.route.params.subscribe((params) => {
      this.deliveryId = params['id'];
      this.startCoordinates = new Coordinates(    
        45.241603, 
        19.803833,
        this.deliveryId
      );
      this.middleCoordinates = new Coordinates(45.241090, 19.806909, this.deliveryId);
      this.middleCoordinates1 = new Coordinates(45.240892, 19.808827, this.deliveryId);
      this.middleCoordinates2 = new Coordinates(45.240781, 19.809740, this.deliveryId);
      this.middleCoordinates3 = new Coordinates(45.240680, 19.811053, this.deliveryId);
      this.middleCoordinates4 = new Coordinates(45.240432, 19.813633, this.deliveryId);
      this.middleCoordinates5 = new Coordinates(45.240021, 19.817796, this.deliveryId);
      this.middleCoordinates6 = new Coordinates(45.239566, 19.824328, this.deliveryId);
      this.middleCoordinates7 = new Coordinates(45.240797, 19.829137, this.deliveryId);
      this.middleCoordinates8 = new Coordinates(45.241508, 19.832023, this.deliveryId);
      this.middleCoordinates9 = new Coordinates(45.242515, 19.836531, this.deliveryId); 
      this.endCoordinates = new Coordinates(45.243905, 19.842050, this.deliveryId); 
      this.deliveryCoordinates = new Coordinates(
        45.241603,
        19.803833,
        this.deliveryId
      );
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.addMarkers();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [45.267136, 19.833549],
      zoom: 10,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);
  }

  private addMarkers(): void {
    // Example marker at the center of the map
    const markerIcon = L.icon({
      iconUrl: '../../../../assets/icons/marker_icon_red.png',
      iconSize: [40, 40],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30],
    });

    const goalIcon = L.icon({
      iconUrl: '../../../../assets/icons/goal_icon_red.png',
      iconSize: [40, 40],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30],
    });

    const deliveryIcon = L.icon({
      iconUrl: '../../../../assets/icons/delivery_icon.png',
      iconSize: [40, 40],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30],
    });

    const start = L.marker(
      [this.startCoordinates.latitude, this.startCoordinates.longitude],
      { icon: markerIcon }
    ).addTo(this.map);

    const goal = L.marker(
      [this.endCoordinates.latitude, this.endCoordinates.longitude],
      { icon: goalIcon }
    ).addTo(this.map);

    const delivery = L.marker(
      [this.deliveryCoordinates.latitude, this.deliveryCoordinates.longitude],
      { icon: deliveryIcon }
    ).addTo(this.map);

    start.bindPopup('Start').openPopup();
    goal.bindPopup('Goal').openPopup();
    delivery.bindPopup('Delivery').openPopup();
  }

  public startDelivery(): void {
    this.coordinatesList = [this.startCoordinates, this.middleCoordinates, this.middleCoordinates1,this.middleCoordinates2,this.middleCoordinates3,this.middleCoordinates4,this.middleCoordinates5,this.middleCoordinates6,this.middleCoordinates7,this.middleCoordinates8,this.middleCoordinates9, this.endCoordinates];
    // console.log(coordinatesList);

    if (!this.stompClient.connected) {
      console.error('WebSocket connection is not established. Initializing...');
      this.initializeWebSocketConnection();
    }

    this.sendMessageUsingSocket();
  }

  initializeWebSocketConnection() {
    // serverUrl je vrednost koju smo definisali u registerStompEndpoints() metodi na serveru
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;

    const headers = { Authorization: `Bearer ${localStorage.getItem('jwt')}` };

    this.stompClient.configure({
      websocket: true,
      debug: (str: string) => {
        console.log(str);
      },
      headers:  new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      }),
      withCredentials: true, // Set withCredentials to true

    });

    this.stompClient.connect(headers, function () {
      that.isLoaded = true;
      that.openGlobalSocket();
    });
  }

  sendMessageUsingSocket() {
    this.stompClient.send(
      '/ws-subscriber/delivery',
      {},
      JSON.stringify(this.coordinatesList)
    );
  }

  openGlobalSocket() {
    if (this.isLoaded) {
      this.stompClient.subscribe(
        '/ws-publisher',
        (message: { body: string }) => {
          this.handleResult(message);
        }
      );
    }
  }

  openSocket() {
    if (this.isLoaded) {
      this.isCustomSocketOpened = true;
      this.stompClient.subscribe(
        '/ws-publisher/coordinates',
        (message: { body: string }) => {
          this.handleResult(message);
        }
      );
    }
  }

  handleResult(message: { body: string }) {
    if (message.body) {
      let coordinatesList: Coordinates[] = JSON.parse(message.body);
      console.log(coordinatesList);

      if (coordinatesList.length > 0) {
        this.updateMapWithCoordinates(coordinatesList[0]);
      }

      if (
        this.deliveryCoordinates.latitude === this.endCoordinates.latitude &&
        this.deliveryCoordinates.longitude === this.endCoordinates.longitude
      ) {
        console.log(
          'Delivery coordinates are the same as end coordinates. Disconnecting WebSocket.'
        );
        this.disconnectWebSocket();
      }
    }
  }

  disconnectWebSocket() {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.disconnect();
      this.isCustomSocketOpened = false;
      console.log('WebSocket disconnected.');
    }
  }

  updateMapWithCoordinates(coordinates: Coordinates): void {
    // Update the deliveryCoordinates property
    this.deliveryCoordinates = coordinates;

    // Clear existing markers
    this.map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });

    // Add new markers with updated coordinates
    this.addMarkers();

    // Center the map on the updated coordinates
    this.map.setView([coordinates.latitude, coordinates.longitude], 13);
  }
}
