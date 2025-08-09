import React, { useEffect, useState } from 'react'; 
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
//@ts-ignore
import L from 'leaflet';
import { Layout } from '../../layout/Layout';
import Navbar from '../../../components/main/navbar/Navbar';
import { useHeading } from '../../../contexts/headingContext';
import { FaCheckCircle, FaCalendarAlt, FaPlusCircle, FaTag, FaNewspaper } from 'react-icons/fa'; 
import { MdEmail } from 'react-icons/md'; 
import CalendarGrid from '../../../components/shared/Calender/Calender';
import ConstituentMap from '../../../components/shared/map/ConstituentMap';

// delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const markerData = [
  { lat: 39.0997, lng: -94.5786, color: '#EF4444', label: 'Gujarati (Kansas City)' }, 
  { lat: 37.6872, lng: -97.3300, color: '#22C55E', label: 'Punjabi (Wichita)' },     
  { lat: 39.0473, lng: -95.6781, color: '#3B82F6', label: 'Tamil (Topeka)' },        
  { lat: 37.2153, lng: -93.2982, color: '#EAB308', label: 'Telugu (Springfield)' },  
  { lat: 38.60, lng: -94.20, color: '#EF4444', label: 'Gujarati (Overland Park)' }, 
  { lat: 38.00, lng: -96.00, color: '#22C55E', label: 'Punjabi (Emporia)' },       
  { lat: 39.50, lng: -95.00, color: '#EF4444', label: 'Gujarati (St. Joseph)' },   
];

const createIcon = (color: string) => {
  return new L.DivIcon({
    className: 'custom-teardrop-icon-wrapper',
    html: `
      <div style="
        background-color: ${color};
        width: 20px;
        height: 25px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        border: 1px solid rgba(255,255,255,0.8);
      "></div>
    `,
    iconSize: [20, 25],
    iconAnchor: [10, 25],
    popupAnchor: [0, -20]
  });
};

const ConstituentProfile: React.FC = () => {
  const { setHeading } = useHeading();

  const [todos, setTodos] = useState([
    { id: 1, text: 'Finalize quarterly financial report', completed: false },
    { id: 2, text: 'Schedule team meeting for Q4 planning', completed: false },
    { id: 3, text: 'Review client feedback from Donor A (complete)', completed: true },
    { id: 4, text: 'Draft newsletter for August campaign', completed: false },
    { id: 5, text: 'Update volunteer database records', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const popularTopics = ['Community Outreach', 'Fundraising Success', 'Volunteer Program', 'Youth Development', 'Environmental Initiatives', 'Partnerships'];
  const recentArticles = [
    { id: 1, title: 'Impact Report 2023: A Year of Progress', link: '#' },
    { id: 2, title: 'Local Heroes: Volunteers Making a Difference', link: '#' },
    { id: 3, title: 'New Fundraising Goal for Educational Programs', link: '#' },
  ];

  useEffect(() => {
    setHeading("Constituent Profile");
  }, [setHeading]);

  return (
    <Layout>
      <Navbar /> 
      <div className="p-6 h-[90vh] overflow-y-scroll space-y-8 mx-auto bg-gray-50">

        <div
          style={{
            background: 'linear-gradient(80deg, #4B006E 0%, #8A2BE2 50%, #FF4B91 100%)',
          }}
          className="relative h-[600px] rounded-2xl p-6 flex flex-col md:flex-row items-center md:items-stretch gap-6 shadow-lg overflow-hidden" 
        >
          <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              xmlns="http://www.w3.org/2000/svg" 
              version="1.1" 
              xmlnsXlink="http://www.w3.org/1999/xlink" 
              viewBox="0 0 1422 800"
              preserveAspectRatio="xMidYMid slice" 
          >
              <defs>
                  <filter id="llleaves-blur-2" x="-100%" y="-100%" width="400%" height="400%"><feGaussianBlur in="SourceGraphic" stdDeviation="2"></feGaussianBlur></filter>
                  <filter id="llleaves-blur-3" x="-100%" y="-100%" width="400%" height="400%"><feGaussianBlur in="SourceGraphic" stdDeviation="4"></feGaussianBlur></filter>
                  <filter id="llleaves-blur-4" x="-100%" y="-100%" width="400%" height="400%"><feGaussianBlur in="SourceGraphic" stdDeviation="12"></feGaussianBlur></filter>
              </defs>
              <g fill="#FF69B4"> 
                  <path d="M352 47H402C430 47 452 69 452 97H402C374 97 352 75 352 47Z " transform="matrix(0.31525421143806664,-0.467383589037341,0.467383589037341,0.31525421143806664,241.61618859120864,237.18989956947027)" opacity="0.87"></path>
                  <path d="M482 707H532C560 707 582 729 582 757H532C504 757 482 735 482 707Z " transform="matrix(0.5235171472555893,-0.3022527658933998,0.3022527658933998,0.5235171472555893,32.239853026057915,509.5839196641973)" opacity="0.93"></path>
                  <path d="M1200 590H1250C1278 590 1300 612 1300 640H1250C1222 640 1200 618 1200 590Z " transform="matrix(0.3068117651258799,-0.4724486876034518,0.4724486876034518,0.3068117651258799,575.9293507165272,1016.8716239518985)" opacity="0.87"></path>
                  <path d="M6 141H56C84 141 106 163 106 191H56C28 191 6 169 6 141Z " transform="matrix(-0.22039445046589237,-0.4145016758066651,0.4145016758066651,-0.22039445046589237,-0.4651889578164301,225.79757262251135)" opacity="0.72"></path>
                  <path d="M790 136H840C868 136 890 158 890 186H840C812 186 790 164 790 136Z " transform="matrix(0.3338366571236028,-0.4594867392554613,0.4594867392554613,0.3338366571236028,485.5998429960444,493.22115917768747)" opacity="0.87"></path>
                  <path d="M1085 204H1135C1163 204 1185 226 1185 254H1135C1107 254 1085 232 1085 204Z " transform="matrix(0.2608160962650767,-0.49052373483404677,0.49052373483404677,0.2608160962650767,726.6437954621413,726.0175529919404)" opacity="0.85"></path>
                  <path d="M123 44H173C201 44 223 66 223 94H173C145 94 123 72 123 44Z " transform="matrix(-0.1497808886186783,-0.4609781750851863,0.4609781750851863,-0.1497808886186783,167.1045996501535,159.08410560442604)" opacity="0.74"></path>
                  <path d="M6 264H56C84 264 106 286 106 314H56C28 314 6 292 6 264Z " transform="matrix(-0.15737780746512614,-0.45705834034499065,0.45705834034499065,-0.15737780746512614,-67.27670314165525,360.0774534167409)" opacity="0.74"></path>
                  <path d="M527 544H577C605 544 627 566 627 594H577C549 594 527 572 527 544Z " transform="matrix(0.503191944685856,-0.32677666971481656,0.32677666971481656,0.503191944685856,100.72232284853044,471.23392189919707)" opacity="0.92"></path>
                  <path d="M212 514H262C290 514 312 536 312 564H262C234 564 212 542 212 514Z " transform="matrix(0.35998834966152304,-0.4445485893827606,0.4445485893827606,0.35998834966152304,-71.92863728862699,461.43800995072235)" opacity="0.88"></path>
                  <path d="M1217 33H1267C1295 33 1317 55 1317 83H1267C1239 83 1217 61 1217 33Z " transform="matrix(0.5417326046187849,-0.27602654887417416,0.27602654887417416,0.5417326046187849,564.6152501132975,376.3051463556892)" opacity="0.94"></path>
                  <path d="M977 225H1027C1055 225 1077 247 1077 275H1027C999 275 977 253 977 225Z " transform="matrix(0.25119507885903886,-0.49299810069994454,0.49299810069994454,0.25119507885903886,645.7731288367811,693.5102797040832)" opacity="0.85"></path>
                  <path d="M418 600H468C496 600 518 622 518 650H468C440 650 418 628 418 600Z " transform="matrix(0.5297001036021798,-0.2936175619821576,0.2936175619821576,0.5297001036021798,36.58937527533135,431.3504542562874)" opacity="0.93"></path>
                  <path d="M453 141H503C531 141 553 163 553 191H503C475 191 453 169 453 141Z " transform="matrix(0.5023244661583185,-0.3262133225720979,0.3262133225720979,0.5023244661583185,196.17938197539746,246.6994398714844)" opacity="0.92"></path>
                  <path d="M158 401H208C236 401 258 423 258 451H208C180 451 158 429 158 401Z " transform="matrix(0.30619427561707097,-0.47149783714331395,0.47149783714331395,0.30619427561707097,-56.54648795140247,393.63278871293704)" opacity="0.86"></path>
                  <path d="M1331 260H1381C1409 260 1431 282 1431 310H1381C1353 310 1331 288 1331 260Z " transform="matrix(0.3514539672893089,-0.4498405645330107,0.4498405645330107,0.3514539672893089,767.4375102815563,806.0654389426347)" opacity="0.88"></path>
                  <path d="M1192 713H1242C1270 713 1292 735 1292 763H1242C1214 763 1192 741 1192 713Z " transform="matrix(0.297357755293184,-0.4758718832738219,0.4758718832738219,0.297357755293184,521.4882180697849,1109.5828556197168)" opacity="0.86"></path>
                  <path d="M842 27H892C920 27 942 49 942 77H892C864 77 842 55 842 27Z " transform="matrix(0.386250887542124,-0.4289750695681666,0.4289750695681666,0.386250887542124,525.1575046948807,414.56071590261416)" opacity="0.89"></path>
                  <path d="M869 584H919C947 584 969 606 969 634H919C891 634 869 612 869 584Z " transform="matrix(0.2700197661623088,-0.4871285530240287,0.4871285530240287,0.2700197661623088,374.1905461052047,892.2291026362362)" opacity="0.86"></path>
                  <path d="M1105 500H1155C1183 500 1205 522 1205 550H1155C1127 550 1105 528 1105 500Z " transform="matrix(0.2608160962650767,-0.49052373483404677,0.49052373483404677,0.2608160962650767,596.232448025962,954.6264631941588)" opacity="0.85"></path>
                  <path d="M975 23H1025C1053 23 1075 45 1075 73H1025C997 73 975 51 975 23Z " transform="matrix(0.4277653058068847,-0.3988976009912101,0.3988976009912101,0.4277653058068847,567.3934767003651,436.33730633725986)" opacity="0.90"></path>
                  <path d="M18 382H68C96 382 118 404 118 432H68C40 432 18 410 18 382Z " transform="matrix(-0.07795483953615796,-0.49218748619766667,0.49218748619766667,-0.07795483953615796,-127.0193777939916,472.1963687526577)" opacity="0.77"></path>
                  <path d="M955 700H1005C1033 700 1055 722 1055 750H1005C977 750 955 728 955 700Z " transform="matrix(0.2515067191325826,-0.49360972917474,0.49360972917474,0.2515067191325826,394.36869362006803,1038.7354064494914)" opacity="0.85"></path>
                  <path d="M1011 429H1061C1089 429 1111 451 1111 479H1061C1033 479 1011 457 1011 429Z " transform="matrix(0.25112270504753936,-0.4928560590971722,0.4928560590971722,0.25112270504753936,570.8021591144445,862.9105706105169)" opacity="0.85"></path>
                  <path d="M713 34H763C791 34 813 56 813 84H763C735 84 713 62 713 34Z " transform="matrix(0.36870864248543816,-0.4394098493025552,0.4394098493025552,0.36870864248543816,455.7501246747599,372.5159051112088)" opacity="0.88"></path>
                  <path d="M1311 722H1361C1389 722 1411 744 1411 772H1361C1333 772 1311 750 1311 722Z " transform="matrix(0.3426745222999387,-0.4547444503193818,0.4547444503193818,0.3426745222999387,554.9258707612053,1109.9293287266246)" opacity="0.88"></path>
                  <path d="M247 287H297C325 287 347 309 347 337H297C269 337 247 315 247 287Z " transform="matrix(0.44381934322754407,-0.3858062690540121,0.3858062690540121,0.44381934322754407,44.814099116567604,288.11282682204785)" opacity="0.90"></path>
              </g>
              <g fill="none" strokeWidth="3" stroke="#FF69B4"> 
                  <path d="M590 703H640C668 703 690 725 690 753H640C612 753 590 731 590 703Z " transform="matrix(0.473701694842589,-0.35695983068919085,0.35695983068919085,0.473701694842589,76.96415855901205,611.5994577956774)" opacity="0.91"></path>
                  <path d="M16 610H66C94 610 116 632 116 660H66C38 660 16 638 16 610Z " transform="matrix(-0.07795483953615796,-0.49218748619766667,0.49218748619766667,-0.07795483953615796,-241.39403432613193,716.9856971945063)" opacity="0.77"></path>
                  <path d="M864 229H914C942 229 964 251 964 279H914C886 279 864 257 864 229Z " transform="matrix(0.28801830384341753,-0.4793429536279972,0.4793429536279972,0.2880183038434341753,528.9981600656051,618.9628104397614)" opacity="0.86"></path>
                  <path d="M981 554H1031C1059 554 1081 576 1081 604H1031C1003 604 981 582 981 554Z " transform="matrix(0.25119507885903886,-0.49299810069994454,0.49299810069994454,0.25119507885903886,486.571973391063,941.8390911622594)" opacity="0.85"></path>
                  <path d="M231 723H281C309 723 331 745 331 773H281C253 773 231 751 231 723Z " transform="matrix(0.4105958353193603,-0.4105958353193605,0.4105958353193605,0.4105958353193603,-141.5031145436219,556.2517449058588)" opacity="0.89"></path>
                  <path d="M1106 28H1156C1184 28 1206 50 1206 78H1156C1128 78 1106 56 1106 28Z " transform="matrix(0.5026501069095402,-0.32642479614859576,0.32642479614859576,0.5026501069095402,557.6359622166962,403.7066086815711)" opacity="0.92"></path>
                  <path d="M1159 381H1209C1237 381 1259 403 1259 431H1209C1181 431 1159 409 1159 381Z " transform="matrix(0.27952349999582854,-0.4841489039022538,0.4841489039022538,0.27952349999582854,674.4916335207283,877.8494838195185)" opacity="0.86"></path>
                  <path d="M766 381H816C844 381 866 403 866 431H816C788 431 766 409 766 381Z " transform="matrix(0.3422243850775494,-0.4541470980493914,0.4541470980493914,0.3422243850775494,352.3611799686668,637.6409316668183)" opacity="0.87"></path>
                  <path d="M-5 496H45C73 496 95 518 95 546H45C17 546 -5 524 -5 496Z " transform="matrix(-0.15737780746512614,-0.45705834034499065,0.45705834034499065,-0.15737780746512614,-186.04539398380948,623.5614630048553)" opacity="0.74"></path>
                  <path d="M281 623H331C359 623 381 645 381 673H331C303 673 281 651 281 623Z " transform="matrix(0.47452497054585036,-0.3575802134297347,0.3575802134297347,0.47452497054585036,-57.7797435531445,458.8668697315311)" opacity="0.91"></path>
                  <path d="M1070 727H1120C1148 727 1170 749 1170 777H1120C1092 777 1070 755 1070 727Z " transform="matrix(0.2516517266197566,-0.49389432239244463,0.49389432239244463,0.2516517266197566,466.74153574675415,1115.919542661481)" opacity="0.85"></path>
                  <path d="M124 293H174C202 293 224 315 224 343H174C146 343 124 321 124 293Z " transform="matrix(0.1666477346592473,-0.5128889894683156,0.5128889894683156,0.1666477346592473,-18.09540448163338,354.2487045458463)" opacity="0.83"></path>
                  <path d="M882 456H932C960 456 982 478 982 506H932C904 506 882 484 882 456Z " transform="matrix(0.2700197661623088,-0.4871285530240287,0.4871285530240287,0.2700197661623088,446.0327439321704,805.1243038943244)" opacity="0.86"></path>
                  <path d="M632 307H682C710 307 732 329 732 357H682C654 357 632 335 632 307Z " transform="matrix(0.4278484885595082,-0.3989751701629379,0.3989751701629379,0.4278484885595082,257.74757430832005,462.0553678493669)" opacity="0.90"></path>
                  <path d="M1321 499H1371C1399 499 1421 521 1421 549H1371C1343 549 1321 527 1321 499Z " transform="matrix(0.3514539672893089,-0.4498405645330107,0.4498405645330107,0.3514539672893089,653.4401550310598,956.5695351151596)" opacity="0.88"></path>
                  <path d="M329 521H379C407 521 429 543 429 571H379C351 571 329 549 329 521Z " transform="matrix(0.502322956882675,-0.3262123424370348,0.3262123424370348,0.502322956882675,10.507660370845201,395.3661433256956)" opacity="0.92"></path>
                  <path d="M1240 268H1290C1318 268 1340 290 1340 318H1290C1262 318 1240 296 1240 268Z " transform="matrix(0.32436711629406373,-0.46324425058805485,0.46324425058805485,0.32436711629406373,735.8358545583577,795.54551818443)" opacity="0.87"></path>
                  <path d="M640 582H690C718 582 740 604 740 632H690C662 632 640 610 640 582Z " transform="matrix(0.4278484885595082,-0.3989751701629379,0.3989751701629379,0.4278484885595082,152.60661460503604,622.5888348568056)" opacity="0.90"></path>
                  <path d="M1313 614H1363C1391 614 1413 636 1413 664H1363C1335 664 1313 642 1313 614Z " transform="matrix(0.3514539672893089,-0.4498405645330107,0.4498405645330107,0.3514539672893089,596.5201218480781,1027.5536043606253)" opacity="0.88"></path>
                  <path d="M361 719H411C439 719 461 741 461 769H411C383 769 361 747 361 719Z " transform="matrix(0.516374706911074,-0.31026922604476326,0.31026922604476326,0.516374706911074,-32.070308717755324,487.33786996255856)" opacity="0.93"></path>
                  <path d="M480 268H530C558 268 580 290 580 318H530C502 318 480 296 480 268Z " transform="matrix(0.5235171472555893,-0.3022527658933998,0.3022527658933998,0.5235171472555893,163.97585154777158,299.80344177761424)" opacity="0.93"></path>
                  <path d="M112 177H162C190 177 212 199 212 227H162C134 227 112 205 112 177Z " transform="matrix(0.1666477346592473,-0.5128889894683156,0.5128889894683156,0.1666477346592473,31.399491112602192,251.4251738926992)" opacity="0.83"></path>
                  <path d="M422 455H472C500 455 522 477 522 505H472C444 505 422 483 422 455Z " transform="matrix(0.5297001036021798,-0.2936175619821576,0.2936175619821576,0.5297001036021798,81.04512134833556,364.3314395265321)" opacity="0.93"></path>
              </g>
          </svg>

          <div className="relative z-10 flex-1 flex flex-col justify-center text-white">
            <h1 
                className="text-7xl font-bold text-white 
                          drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255,255,255,1), rgba(230,230,230,0.9))',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  textShadow: '0 0 8px rgba(255,255,255,0.5), 0 0 15px rgba(255,255,255,0.3)',
                }}
              >
                Hello Team Smith
          </h1>
            <p className="text-2xl italic mt-1 opacity-90">August 6, 4:18 CST</p>
          </div>

            <ConstituentMap embedded heightClass="h-full"  />

          {/* <div className="relative z-10 flex-[1] bg-white rounded-xl p-3 flex flex-col shadow-lg z-0"> 

            

            <div className="flex-1 rounded-lg overflow-hidden border border-gray-200 z-20">
              <ConstituentMap embedded heightClass="h-full" />
            </div>

            <div className="mt-3 bg-gray-100 rounded-md px-3 py-2 flex flex-wrap gap-4 text-sm font-medium text-gray-700">
              <span className="italic font-semibold">Legend</span>
              {markerData
                .filter((item, i, arr) => arr.findIndex(t => t.label.split(' ')[0] === item.label.split(' ')[0]) === i)
                .map((marker, idx) => (
                  <span key={idx} className="flex items-center">
                    <div
                      style={{
                        backgroundColor: marker.color,
                        width: '12px',
                        height: '16px',
                        borderRadius: '50% 50% 50% 0',
                        transform: 'rotate(-45deg)',
                        border: '1px solid rgba(255,255,255,0.8)',
                      }}
                      className="mr-1.5"
                    ></div>
                    {marker.label.split(' ')[0]}
                  </span>
                ))}
            </div>
          </div> */}
        </div>


        <div className="bg-gray-100 rounded-xl p-6 shadow-sm border border-gray-200 mt-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-5 pb-2 border-b border-gray-300"> 
                What's Happening in New Jersey
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex flex-col items-center h-[550px]"> 
                    <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                        <FaCalendarAlt className="mr-2 text-purple-600 text-xl" /> Calendar (Upcoming)
                    </h3>
                    <div className="w-full h-full bg-white rounded-lg border border-gray-200 shadow-inner overflow-hidden">
                        <CalendarGrid /> 
                    </div>
                </div>

                <div className="flex flex-col gap-6 h-[550px]"> 
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex-1 min-h-[250px] overflow-y-auto custom-scrollbar"> 
                        <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                            <FaCalendarAlt className="mr-2 text-orange-600 text-xl" /> Upcoming
                        </h3>
                        <div className="relative space-y-4 pt-1">
                            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>

                            {[
                                { type: 'upcoming', title: 'Cultural Show XYZ', date: 'August 15', checked: false },
                                { type: 'upcoming', title: 'Annual Gala Prep Meeting', date: 'August 20', checked: false },
                                { type: 'upcoming', title: 'Board Meeting', date: 'September 5', checked: false },
                                { type: 'upcoming', title: 'Community Outreach Program', date: 'Sept 10', checked: false },
                                { type: 'upcoming', title: 'Holiday Event Planning Session', date: 'Sept 25', checked: false },
                                { type: 'attended', title: 'Attended Donor Meetup (July)', date: 'July 28', checked: true },
                                { type: 'attended', title: 'Email follow-up campaign completed', date: 'July 10', checked: true },
                                { type: 'attended', title: 'Independence Day Campaign launch', date: 'August 5', checked: true },
                                { type: 'attended', title: 'Temple Visit for Community Engagement', date: 'July 30', checked: true },
                                { type: 'attended', title: 'Volunteer Orientation Session', date: 'June 10', checked: true },
                                { type: 'attended', title: 'Fundraiser Review & Strategy', date: 'July 15', checked: true },
                            ].map((event, index) => (
                                <div key={index} className="flex items-start relative pl-10 pr-2 py-2 bg-gray-50 rounded-lg shadow-xs border border-gray-200">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-blue-500 border border-white flex items-center justify-center">
                                    {event.checked ? <FaCheckCircle className="text-white text-xs" /> : <FaCalendarAlt className="text-white text-[10px]" />}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800 text-sm">{event.title}</p>
                                    <p className="text-xs text-gray-600">{event.date}</p>
                                    {event.checked && (
                                    <p className="text-[10px] text-green-600 mt-0.5">
                                        <FaCheckCircle className="inline mr-1" /> Attended
                                    </p>
                                    )}
                                </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex-1 min-h-[250px] flex flex-col"> 
                        <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                            <FaCheckCircle className="mr-2 text-blue-600 text-xl" /> Orders / To Dos
                        </h3>
                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                placeholder="Add new task..."
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                                onKeyPress={(e) => { if (e.key === 'Enter') addTodo(); }}
                                className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                            />
                            <button
                                onClick={addTodo}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center justify-center hover:bg-blue-700 transition-colors text-sm"
                            >
                                <FaPlusCircle className="mr-1" /> Add
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-2">
                            {todos.length > 0 ? (
                                todos.map((todo) => (
                                    <div key={todo.id} className="flex items-center bg-gray-50 p-3 rounded-lg border border-gray-200 shadow-xs">
                                        <input
                                            type="checkbox"
                                            checked={todo.completed}
                                            onChange={() => toggleTodo(todo.id)}
                                            className="form-checkbox h-4 w-4 text-blue-600 rounded mr-3"
                                        />
                                        <span className={`text-gray-800 text-sm flex-1 ${todo.completed ? 'line-through text-gray-500 italic' : ''}`}>
                                            {todo.text}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm text-center py-4">No tasks to display. Start by adding one!</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-gray-100 rounded-xl p-6 shadow-sm border border-gray-200 mt-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-5 pb-2 border-b border-gray-300"> 
                Quick Links
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 min-h-[150px]">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                        <FaTag className="mr-2 text-green-600 text-xl" /> Popular Topics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {popularTopics.map((topic, index) => (
                            <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full cursor-pointer hover:bg-green-200 transition-colors">
                                {topic}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 min-h-[150px]">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                        <FaNewspaper className="mr-2 text-indigo-600 text-xl" /> Recent Articles
                    </h3>
                    <ul className="space-y-2 text-sm">
                        {recentArticles.map((article) => (
                            <li key={article.id}>
                                <a href={article.link} className="text-indigo-700 hover:text-indigo-900 font-medium transition-colors">
                                    • {article.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default ConstituentProfile;
