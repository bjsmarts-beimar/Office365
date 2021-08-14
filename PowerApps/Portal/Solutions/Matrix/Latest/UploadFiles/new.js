
/*
{% fetchxml getStates %}
<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
  <entity name="po_state">
    <attribute name="po_stateid" />
    <attribute name="po_name" />
    <attribute name="po_stateabbreviation" />
    <order attribute="po_stateabbreviation" descending="false" />
    <filter type="and">
      <condition attribute="statecode" operator="eq" value="0" />
    </filter>
  </entity>
</fetch>
{% endfetchxml %}
{% fetchxml patientInProgressTests %}
<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
  <entity name="msemr_specimen">
    <attribute name="msemr_specimenid" descending="false" />
    <attribute name="createdon" />
    <filter type="and">
      <condition attribute="statecode" operator="eq" value="0" />
      <condition attribute="msemr_subjecttypepatient" operator="eq" uitype="contact" value="{{user.id}}" />
      <condition attribute="po_labkitstatus" operator="in">
        <value>936710003</value>
        <value>936710005</value>
        <value>936710000</value>
        <value>936710004</value>
        <value>936710001</value>
      </condition>
      <condition attribute="createdon" operator="le" value='{{ "today" | date: "yyyy-MM-dd HH:mm:ss" }}' />
    </filter>
  </entity>
</fetch>
{% endfetchxml %}
{% fetchxml patientUnfufilledTestOrders %}
<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
  <entity name="po_testorder">
    <attribute name="po_testorderid" />
    <attribute name="statecode" />
    <attribute name="po_patient" />
    <attribute name="po_fulfillmentstatus" />
    <attribute name="po_numberoftests" />
    <attribute name="createdon" />
    <order attribute="po_numberoftests" descending="false" />
    <filter type="and">
      <condition attribute="statecode" operator="eq" value="0" />
      <condition attribute="po_patient" operator="eq" uitype="contact" value="{{user.id}}" />
      <condition attribute="createdon" operator="le" value='{{ "today" | date: "yyyy-MM-dd HH:mm:ss" }}' />
      <filter type="or">
        <condition attribute="po_fulfillmentstatus" operator="in">
          <value>936710003</value>
          <value>936710002</value>
        </condition>
        <condition attribute="mmn_orderstate" operator="eq" value="174860001" />
      </filter>
    </filter>
  </entity>
</fetch>
{% endfetchxml %}
{% fetchxml notReturnedTestOrderItems %}
<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
  <entity name="po_testorderitem">
    <attribute name="po_testorderitemid" />
    <attribute name="po_labreturnstatus" />
    <attribute name="createdon" />
    <order attribute="po_labreturnstatus" descending="false" />
    <filter type="and">
      <condition attribute="statecode" operator="eq" value="0" />
      <condition attribute="po_patient" operator="eq" uitype="contact" value="{{user.id}}" />
      <condition attribute="po_labreturnstatus" operator="eq" value="0" />
      <condition attribute="mmn_testorderitemstate" operator="in">
        <value>174860000</value>
        <value>174860001</value>
      </condition>
      <condition attribute="createdon" operator="le" value='{{ "today" | date: "yyyy-MM-dd HH:mm:ss" }}' />
    </filter>
    <link-entity name="po_shippingmethod" from="po_shippingmethodid" to="po_shippingmethod" visible="false" link-type="outer" alias="a_d46057b32367eb11a8120022481c38ea">
      <attribute name="po_shippingcompany" />
    </link-entity>
  </entity>
</fetch>
{% endfetchxml %}

{% fetchxml notReturnedNotReceivedTestOrderItems %}
<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
  <entity name="po_testorderitem">    
    <attribute name="po_testorderitemid" />
    <attribute name="createdon" />
    <order attribute="po_fulfillmentshippeddate" descending="false" />
    <filter type="and">
      <condition attribute="statecode" operator="eq" value="0" />
      <condition attribute="po_patient" operator="eq" uitype="contact" value="{{user.id}}" />
      <condition attribute="po_labreturnstatus" operator="eq" value="0" />
      <condition attribute="mmn_testorderitemstate" operator="eq" value="174860002" />
      <condition attribute="createdon" operator="le" value='{{ "today" | date: "yyyy-MM-dd HH:mm:ss" }}' />
    </filter>
    <link-entity name="po_shippingmethod" from="po_shippingmethodid" to="po_shippingmethod" visible="false" link-type="outer" alias="a_d46057b32367eb11a8120022481c38ea">
      <attribute name="po_shippingcompany" />
    </link-entity>
  </entity>
</fetch>
{% endfetchxml %}

{% assign unfufilledTestOrders = 0 %} 
{% for testorder in patientUnfufilledTestOrders.results.entities %}
{% assign numberOfTests = testorder.po_numberoftests | default:0 %}
{% assign NotReturnedNotReceivedTestOrderItems = notReturnedNotReceivedTestOrderItems.results.entities | size | default:0 %}
{% assign unfufilledTestOrders = unfufilledTestOrders | plus: numberOfTests %}
{% assign unfufilledTestOrders = unfufilledTestOrders | minus: NotReturnedNotReceivedTestOrderItems %}
{% endfor %}
{% assign maxActiveTest = entities.account[user.msemr_managingorganization.id].po_maxactivetestsperemployee | default: settings['Test Order Kit Max'] %}
{% assign inProgressTest = patientInProgressTests.results.entities | size | default:0 %} 
{% assign TestOrderItems = notReturnedTestOrderItems.results.entities | size | default:0 %} 
{% assign unfufilledNumberofTests = unfufilledTestOrders %} 
{% assign patientTest = inProgressTest | plus: unfufilledNumberofTests | plus: TestOrderItems %}
{% assign testKitsRemaining = maxActiveTest | minus: patientTest %}
*/
$(document).on("ready", function(){
  console.log("size = {{patientUnfufilledTestOrders.results[0].entities.po_numberoftests}}")
console.log("maxActive test = {{maxActiveTest}}, inProgressTest={{inProgressTest}}, NotReturnedNotReceivedTestOrderItems={{NotReturnedNotReceivedTestOrderItems}} ,unfufilledNumberofTestOrders={{unfufilledNumberofTests}}, Test order items={{TestOrderItems}}, patientTest={{patientTest}}, testKitsRemaining= {{testKitsRemaining}}");
$('#po_numberoftests').parents('div.control').append('<span class="number-subtext">Your employer has determined how many test you can order.</span>');
//$('table[data-name="address"]').before('<span>Before we ship the test kit to you, please confirm your shipping address.</span>');
$('#po_numberoftests').before('<select name="numberoftests" id="numberoftests" class="form-control " required="" aria-invalid="true"><option value="" label=" "></option>{% for i in (1..testKitsRemaining) %}<option value="{{i}}" label="{{i}}">{{i}}</option>{% endfor %}</select>');
$('table[data-name="address"] tbody').append('<div><input type="checkbox" id="homeAddress" name="homeaddress"> Use Default Address</div>');
$('#po_address').attr('placeholder','Address');
$('#po_aptnumber').attr('placeholder','Apt Number');
$('#po_city').attr('placeholder','City');
$('#po_zipcode_new').attr('placeholder','Zip');
$('#po_stateid option:nth(0)').attr('label','State');
$('div.page-header').append('<div class="take-test"><span>Already Have a Test?</span><p><a href="{{ sitemarkers['Take Test'].url }}" class="btn btn-success">Take Test</a></p></div>');

{% for state in getStates.results.entities %}
$('#po_stateid option:nth({{forloop.index}})').text("{{state.po_stateabbreviation }}");
{% endfor %}

 $('#numberoftests').on("change", function(){
   var qty = $(this).selected().val();
   $("#po_numberoftests").addClass("dirty");
   $("#po_numberoftests").val(qty);
 });

var address = "{{user.address1_line1}}";
var apt =  "{{user.address1_line2}}";
var city = "{{user.address1_city}}";
var state = "{{user.address1_stateorprovince}}";
var zip = "{{user.address1_postalcode}}";

 $('#homeAddress').on("change", function(){
   if ($(this).prop("checked") === true){
    $('#po_address').val(address);
    $('#po_aptnumber').val(apt);
    $('#po_city').val(city);
    $('#po_zipcode_new').val(zip);
   $('#po_stateid ').selected().val($('#po_stateid option:contains("{{user.address1_stateorprovince}}")').val());  
   }else{
    $('#po_address').val("");
    $('#po_aptnumber').val("");
    $('#po_city').val("");
    $('#po_zipcode_new').val("");
    $('#po_stateid').selected().val($("#po_stateid option:first").val());  
   }
    $('#po_address').addClass("dirty");
    $('#po_aptnumber').addClass("dirty");
    $('#po_city').addClass("dirty");
    $('#po_zipcode_new').addClass("dirty");
    $('#po_stateid').addClass("dirty");   
 });
});