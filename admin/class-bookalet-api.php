<?php

/**
 * The api-specific functionality of the plugin.
 *
 * @link       http://bookalet.co.uk
 * @since      1.0.0
 *
 * @package    Bookalet
 * @subpackage Bookalet/api
 */

/**
 * The api-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the api-specific stylesheet and JavaScript.
 *
 * @package    Bookalet
 * @subpackage Bookalet/api
 * @author     BnB Select Ltd <info@bookalet.co.uk>
 */
class Bookalet_API {

	private $api_url = 'https://secure.bookalet.co.uk/api/booking_api.asmx/';
    //private $api_url = 'https://secure.bookaletlocal.co.uk:44380/api/booking_api.asmx/';
	private $api_key = '';

	public function __construct($apiKey)
    {
		$this->api_key = $apiKey;
    }
	
	function callApi($url, $data = array()) {
		$data['ApiKey'] = $this->api_key;
					
		$additional = false;
		// use key 'http' even if you send the request to https://...
		$options = array(
            'http' => array(
                'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
                'method'  => 'POST',
                'content' => http_build_query($data),
                'ignore_errors' => true
            ),
		);
		$context = stream_context_create($options);
		$result = file_get_contents($url, false, $context);
		if ($result !== false)
		{
			libxml_use_internal_errors(true);
			return simplexml_load_string($result);
		}
		return false;
	}
	
	public function getWidgetType($i)
	{
		switch ($i) {
			case 1:
				echo "Calendar";
				break;
			case 2:
				echo "Calendar and Booking Form";
				break;
			case 3:
				echo "Rate Card";
				break;
			case 4:
				echo "Enquiry Form";
				break;
			case 5:
				echo "Search";
				break;
			case 6:
				echo "Special Offers";
				break;
			case 7:
				echo "Facilities";
				break;
			case 8:
				echo "Map";
				break;
		}
	}
	
	function getWidgets() {
		$data = array('default' => array(), 'additional' => array());
		
		$widgetsXml = $this->callApi($this->api_url.'GetWidgets');
		if ($widgetsXml === false) {
			throw new Exception('Error fetching widget data');
		}else{
			foreach($widgetsXml as $widget) {
				if ($widget->Preset == 'true')
				{
					array_push($data['default'], $widget);
				}
				else 
				{
					array_push($data['additional'], $widget);
				}
			}
		}
	
		return $data;
	}
	
	function getWidget($id) {
		$data = null;
		$widgetsXml = $this->callApi($this->api_url.'GetWidget', array('id' => $id));
		if ($widgetsXml === false) {
			throw new Exception('Error fetching widget data');
		}else{
			$data = $widgetsXml;
		}
		return $data;
	}
	
	function updateWidget($data) {
		$widgetsXml = $this->callApi($this->api_url.'UpdateWidget', $data);
		if ($widgetsXml === false) {
			throw new Exception('Error fetching widget data');
		}elseif ((string)$widgetsXml !== 'success')
		{
			throw new Exception('Error fetching widget data');
		}

		return true;
	}
	
	function deleteWidget($data) {
		$widgetsXml = $this->callApi($this->api_url.'DeleteWidget', $data);
		if ($widgetsXml === false) {
			throw new Exception('Error fetching widget data');
		}elseif ((string)$widgetsXml !== 'success')
		{
			throw new Exception('Error fetching widget data');
		}
		
		return true;
	}
	
	function getProperties() {
		$props =  ["edition" => -1, "props" => ""];

		$propertyXml = $this->callApi($this->api_url.'GetProperties');
		if ($propertyXml === false) {
			throw new Exception('Error fetching property data');
		} else {
			$props['edition'] = $propertyXml->OwnerEdition;
			foreach ($propertyXml->Properties->Property as $property) {
                $props['props'] .= (string)$property->Id . ': "' . (string)$property->Name . '",';
            }
            $props['props'] = rtrim($props['props'],',');
		}
		
		return $props;
	}

	function getPropertyGroups() {
		$groups = '';
		$propertyGroupXml = $this->callApi($this->api_url.'GetPropertyGroups');
		if ($propertyGroupXml === false) {
			throw new Exception('Error fetching property group data');
		} else {
			foreach ($propertyGroupXml->PropertyGroup_Category as $category) {
                $groups .= '"' . (string)$category->Id . '": {name: "' . (string)$category->Name . '", items:{';
                foreach ($category->Groups->PropertyGroup as $group) {
                     $groups .= '"' . (string)$group->Id . '": "' . (string)$group->Name . '",';
                }
                $groups = rtrim($groups,',');
				$groups .= '}},';
            }
            $groups = rtrim($groups,',');
		}
		
		return $groups;
	}

	function getThemes() {
		$themes = '';
		$themesXml = $this->callApi($this->api_url.'GetThemes');
		if ($themesXml === false) {
			throw new Exception('Error fetching theme data');
		} else {
			foreach ($themesXml->Theme as $theme) {
                $themes .= (string)$theme->Id . ': "' . (string)$theme->Name . '",';
            }
            $themes = rtrim($themes,',');
		}
		
		return $themes;
	}
}