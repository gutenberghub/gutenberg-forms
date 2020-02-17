const { getBlock } = wp.data.select("core/block-editor");

export function getFieldName(field, id) {
	let shorten_id = id.substring(0, 6);

	return field + "-" + shorten_id;
}

export function extract_id(id) {
	let exploded = id.split("-");

	return exploded[exploded.length - 1];
}

export function getEncodedData(f, id, isRequired) {
	return encodeURIComponent(
		window.btoa(`--${getFieldName(f, id)}-${isRequired}-${f}`)
	);
}

export function getFieldIcon(name) {
	const field = name.split("/")[name.split("/").length - 1];

	switch (field) {
		case "email":
			return "email";
		case "name":
			return "admin-users";
		case "message":
			return "testimonial";
		case "checkbox":
			return "yes";
		case "datepicker":
			return "calendar-alt";
		case "radio":
			return "marker";
		case "phone":
			return "phone";
		case "website":
			return "laptop";
		case "text":
			return "text";
		case "select":
			return "menu-alt";
		case "number":
			return "screenoptions";
		case "yes-no":
			return "no";
		default:
			return;
	}
}

const layoutBlocks = ["cwp/form-column", "cwp/column", "cwp/form-group"]; //blocks that will be ignored while serializing...

export function serializeFields(fields) {
	let f = [];

	fields.forEach(field => {
		if (field.name.startsWith("cwp/") && !layoutBlocks.includes(field.name)) {
			f.push({
				blockName: field.name,
				fieldName: field.attributes.label,
				field_id: field.attributes.field_name
			});
		} else if (layoutBlocks.includes(field.name)) {
			f.push(...serializeFields(field.innerBlocks));
		}
	});

	return f;
}

export function strip_tags(str) {
	let withoutTags = str.replace(/<[^>]*>?/gm, "");

	return withoutTags;
}

export const basicColorScheme = [
	{
		color: "rgb(247, 141, 167)",
		name: "Pale Pink"
	},
	{
		name: "Vivid red",
		color: "rgb(207, 46, 46)"
	},
	{
		name: "Luminous vivid orange",
		color: "rgb(255, 105, 0)"
	},
	{
		color: "rgb(252, 185, 0)",
		name: "Luminous vivid amber"
	},
	{
		color: "rgb(123, 220, 181)",
		name: "Light green cyan"
	},
	{
		color: "rgb(0, 208, 132)",
		name: "Vivid green cyan"
	},
	{
		color: "rgb(142, 209, 252)",
		name: "Pale cyan blue"
	},
	{
		color: "rgb(6, 147, 227)",
		name: "Vivid cyan blue"
	},
	{
		color: "rgb(155, 81, 224)",
		name: "Vivid purple"
	},
	{
		color: "rgb(238, 238, 238)",
		name: "Very light gray"
	},
	{
		color: "rgb(171, 184, 195)",
		name: "Cyan bluish gray"
	},
	{
		color: "rgb(49, 49, 49)",
		name: "Very dark gray"
	}
];

export const firstCapital = str => {
	let c = str.substring(0, 1).toUpperCase();

	return c.concat(str.substring(1, str.length));
};