var snmp = require ("net-snmp");

ip="192.168.50.150"
community='public'

var session = snmp.createSession (ip,community)

// OIDs
systemDescription = '1.3.6.1.2.1.1.1.0'
systemuptime='1.3.6.1.2.1.1.3.0'
getipaddr='1.3.6.1.2.1.4.20.1.1.'+ip
port1='1.3.6.1.4.1.4526.11.15.1.1.1.2.1.1'
port2='1.3.6.1.4.1.4526.11.15.1.1.1.2.1.2'
port3='1.3.6.1.4.1.4526.11.15.1.1.1.2.1.3'
port4='1.3.6.1.4.1.4526.11.15.1.1.1.2.1.4'
port5='1.3.6.1.4.1.4526.11.15.1.1.1.2.1.5'
port6='1.3.6.1.4.1.4526.11.15.1.1.1.2.1.6'
port7='1.3.6.1.4.1.4526.11.15.1.1.1.2.1.7'
port8='1.3.6.1.4.1.4526.11.15.1.1.1.2.1.8'

var name = ['System Name','System Up Time','IP Addr','port1','port2','port3','port4','port5','port6','port7','port8']

var oids = [systemDescription,systemuptime,getipaddr,port1,port2,port3,port4,port5,port6,port7,port8]
 
session.get(oids, function (error, varbinds) {
    if (error) {
        console.error(error);
    } else {
        // console.log(varbinds)
        for (var i = 0; i < varbinds.length; i++)
            if (snmp.isVarbindError(varbinds[i]))
                console.error(snmp.varbindError (varbinds[i]))
            else
                console.log(name[i] + " = " + varbinds[i].value);
    }
    session.close ();
});

session.trap(snmp.TrapType.LinkDown, function (error) {
    if (error){
        console.error (error);
    }
    else{
        // console.log('d');
    }
});