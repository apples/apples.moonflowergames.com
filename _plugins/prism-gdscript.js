Prism.languages.gdscript = {
	'doccomment': /##.*/,
	'comment': /#.*/,
	'string': {
		pattern: /@?(?:("|')(?:(?!\1)[^\n\\]|\\[\s\S])*\1(?!"|')|"""(?:[^\\]|\\[\s\S])*?""")/,
		greedy: true
	},
	'class-name': {
		// class_name Foo, extends Bar, class InnerClass
		// as Node
		// const FOO: int = 9, var bar: bool = true
		// func add(reference: Item, amount: int) -> Item:
		pattern: /(^(?:class|class_name|extends)[ \t]+|\bas[ \t]+|(?:\b(?:const|var)[ \t]|[,(])[ \t]*\w+[ \t]*:[ \t]*|->[ \t]*)[a-zA-Z_]\w*/m,
		lookbehind: true
	},
  'function-def': {
    pattern: /(\bfunc\s+)[a-z_]\w*\b/im,
    lookbehind: true
  },
	'keyword': /\b(?:class|class_name|extends|is|in|as|self|signal|func|static|const|enum|var|breakpoint|preload|await|yield|assert|and|or|not|null)\b/,
	'control-flow': /\b(?:if|elif|else|for|while|match|break|continue|pass|return)\b/,
  'global-func': /\b(?:abs|absf|absi|acos|acosh|angle_difference|asin|asinh|atan|atan2|atanh|bezier_derivative|bezier_interpolate|bytes_to_var|bytes_to_var_with_objects|ceil|ceilf|ceili|clamp|clampf|clampi|cos|cosh|cubic_interpolate|cubic_interpolate_angle|cubic_interpolate_angle_in_time|cubic_interpolate_in_time|db_to_linear|deg_to_rad|ease|error_string|exp|floor|floorf|floori|fmod|fposmod|hash|instance_from_id|inverse_lerp|is_equal_approx|is_finite|is_inf|is_instance_id_valid|is_instance_valid|is_nan|is_same|is_zero_approx|lerp|lerp_angle|lerpf|linear_to_db|log|max|maxf|maxi|min|minf|mini|move_toward|nearest_po2|pingpong|posmod|pow|print|print_rich|print_verbose|printerr|printraw|prints|printt|push_error|push_warning|rad_to_deg|rand_from_seed|randf|randf_range|randfn|randi|randi_range|randomize|remap|rid_allocate_id|rid_from_int64|rotate_toward|round|roundf|roundi|seed|sign|signf|signi|sin|sinh|smoothstep|snapped|snappedf|snappedi|sqrt|step_decimals|str|str_to_var|tan|tanh|type_convert|type_string|typeof|var_to_bytes|var_to_bytes_with_objects|var_to_str|weakref|wrap|wrapf|wrapi)\b/,
	'function': /\b[a-zA-Z_]\w*(?=[ \t]*\()/i,
	'node-ref': /(?:\$|%)\w+/,
	'node-path': /\^\w+/,
	'string-name': /&\w+/,
	'number': [
		/\b0b[01_]+\b|\b0x[\da-fA-F_]+\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.[\d_]+)(?:e[+-]?[\d_]+)?\b/,
		/\b(?:INF|NAN|PI|TAU)\b/
	],
	'boolean': /\b(?:false|true)\b/,
	'operator': /->|:=|&&|\|\||<<|>>|[-+*/%&|!<>=]=?|[~^]/,
  'annotation': /@[a-zA-Z_]+\b/,
  'member': /\.[a-zA-Z_]\w*\b/,
  'punctuation': /[.:,;()[\]{}]/,
};
