({
    handleChange : function(component, event, helper) {
        component.set("v.valueFromLWC", event.getParam("value"));
    },

    handleDataChange : function(cmp, evt, hlp) {
        cmp.find("lwcId").changeData(evt.getParam("value"));
    }
})
