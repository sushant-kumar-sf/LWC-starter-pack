({

    handleDataChange : function(cmp, evt, hlp) {
        cmp.find("pubsub").fireEvent('sistermessage', evt.getSource().get("v.value"));
    },

    handlePubsubReady : function(cmp, evt, hlp) {
        let service  = cmp.find("pubsub");
        service.registerListener('brothermessage', $A.getCallback(function(message){
            cmp.set("v.message", message);
        }));
    }
})
